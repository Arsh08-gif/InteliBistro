import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { fetchMenu } from '../api/bistroApi';
import Sidebar from '../components/Sidebar';

const HERO_IMAGE = 'https://plus.unsplash.com/premium_photo-1694547926001-f2151e4a476b?q=80&w=1011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export default function HomeScreen({ navigation }) {
    const [specials, setSpecials] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        fetchMenu()
            .then(data => setSpecials(data.filter(item => item.tags.includes('bestseller')).slice(0, 2))) // take all bestsellers and get only 2 from them
            .catch(err => console.error(err));

    }, [])

    const handleNavigate = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>

            {/* Hero */}
            <ImageBackground
                source={{ uri: HERO_IMAGE }}
                style={{ height: 520, justifyContent: 'space-between' }}
                imageStyle={{ opacity: 0.65 }}
            >
                <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(13,31,28,0.5)' }} />

                {/* Top bar */}
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            {/* <View style={{ width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' }}>

                            </View> */}
                            <Text style={{
                                color: colors.gold,
                                fontSize: 30,
                                fontWeight: '600',
                                letterSpacing: 1,
                                fontFamily: 'FleurDeLeah_400Regular'
                            }}

                            >
                                Manara
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setSidebarOpen(true)}
                            style={{ gap: 5 }}>
                            <View style={{ width: 22, height: 1.5, backgroundColor: colors.cream }} />
                            <View style={{ width: 16, height: 1.5, backgroundColor: colors.cream }} />
                            <View style={{ width: 22, height: 1.5, backgroundColor: colors.cream }} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Hero text */}
                <View style={{ alignItems: 'center', paddingBottom: 48, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.gold, marginBottom: 12 }}>INTELLIGENT DINING</Text>
                    <Text style={{
                        fontSize: 36,
                        color: colors.cream,
                        textAlign: 'center',
                        lineHeight: 44,
                        marginBottom: 8,
                        fontFamily: 'DMSerifDisplay_400Regular'
                    }}>Welcome To Manara</Text>
                    <Text style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(245,236,215,0.5)', marginBottom: 28 }}>ARTISANAL · FRESH · CRAFTED</Text>

                </View>

            </ImageBackground>

            {/* Specials */}
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 11, fontWeight: '600', letterSpacing: 3, color: colors.gold, marginBottom: 14 }}>TODAY'S SPECIALS</Text>
                {specials.map(item => (
                    <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden', borderWidth: 0.5, borderColor: colors.border, marginBottom: 10 }}>
                        <Image source={{ uri: item.image }} style={{ width: 72, height: 72 }} />
                        <View style={{ flex: 1, padding: 12 }}>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: '600',
                                color: colors.cream,
                                marginBottom: 2,
                                fontFamily: 'DMSerifDisplay_400Regular'
                            }}>{item.name}</Text>
                            <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4, fontFamily: 'DMSans_400Regular' }}>{item.description}</Text>
                            <Text style={{ fontSize: 13, fontWeight: '700', color: colors.gold, fontFamily: 'DMSans_700Bold' }}>${item.price}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Stats */}
            <View style={{ margin: 20, backgroundColor: colors.card, borderRadius: 16, padding: 20, borderWidth: 0.5, borderColor: colors.border, flexDirection: 'row', justifyContent: 'space-around' }}>
                {[['12+', 'YEARS'], ['50+', 'DISHES'], ['4.9★', 'RATING']].map(([val, label]) => (
                    <View key={label} style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.gold }}>{val}</Text>
                        <Text style={{ fontSize: 10, color: colors.muted, letterSpacing: 1, marginTop: 4 }}>{label}</Text>
                    </View>
                ))}
            </View>

            <Sidebar
                visible={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onNavigate={handleNavigate}
            />
        </ScrollView >
    );
}