import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { fetchMenu } from '../api/bistroApi'
import styles from './styles/MenuScreen.styles';
import useCartStore from '../store/cartStore';
import * as Haptics from 'expo-haptics';

const CATEGORIES = ['Mains', 'Sides', 'Drinks', 'Desserts'];
const HERO_IMAGE = 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80'

export default function MenuScreen() {
    // screen states
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('Mains');

    // variables:
    const filtered = menu.filter(item => item.category === activeCategory);
    const addItem = useCartStore(state => state.addItem)

    useEffect(() => {
        console.log('useEffect ran');
        fetchMenu()
            .then(data => {
                console.log('data received:', data);
                setMenu(data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color={colors.ocean} />
            </View>
        )
    }
    return (
        <ImageBackground
            source={{ uri: HERO_IMAGE }}
            style={{ flex: 1 }}
            imageStyle={{ opacity: 5 }}
        >
            <View style={{ position: 'absolute', inset: 0, backgroundColor: colors.bg, opacity: 0.85 }} />
            <SafeAreaView style={{ flex: 1 }}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerSubtitle}>THE INTELLIGENT</Text>
                    <Text style={styles.headerTitle}> MENU</Text>
                </View>

                {/* Category tabs - no scroll, just a row */}
                <View style={styles.tabsRow}>
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setActiveCategory(cat)}
                            style={[styles.categoryTab, activeCategory === cat && styles.categoryTabActive]}
                        >
                            <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
                                {cat.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>



                {/* Glass slab */}
                <ScrollView style={styles.glassSlab}>
                    {filtered.map((item, index) => (
                        <View key={item.id} style={styles.itemRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 56, height: 56, borderRadius: 10, marginRight: 12 }}
                                />
                                <View style={{ flex: 1 }}>
                                    <View style={styles.itemTopRow}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemPrice}>${item.price}</Text>
                                    </View>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                </View>
                            </View>
                            <View style={styles.itemBottomRow}>
                                <View style={{ flexDirection: 'row', gap: 4 }}>
                                    {item.tags.slice(0, 2).map(tag => (
                                        <Text key={tag} style={[styles.tag, tag === 'bestseller' && styles.tagBestseller]}>
                                            {tag}
                                        </Text>
                                    ))}
                                </View>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => {
                                        addItem(item);
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    }}
                                >
                                    <Text style={styles.addButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </SafeAreaView>
        </ImageBackground>
    );
}

