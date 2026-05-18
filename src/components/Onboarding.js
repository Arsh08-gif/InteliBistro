import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window')
const HERO_IMAGE = "https://images.unsplash.com/photo-1577219492769-b63a779fac28?q=80&w=998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const SLIDES = [
    {
        id: "1",
        emoji: "restaurant-outline",
        title: "Manara",
        subtitle: "INTELLIGENT DINING",
        description: 'Experience dining reimagined. Order, reserve, and explore — all through natural conversation.',
    },
    {
        id: '2',
        features: [
            { icon: 'cart-outline', title: 'Order by voice', example: '"Add two spicy chicken sandwiches and a water"' },
            { icon: 'calendar-outline', title: 'Reserve a table', example: '"Book a table for 4 at 7pm tonight"' },
            { icon: 'mail-outline', title: 'Email confirmation', example: '"Place my order" sends confirmation to your email' },
        ],
    },
    {
        id: '3',
        title: 'Ready to dine?',
        description: 'Just chat naturally. I understand what you need and take care of the rest.',
        cta: true,
    },
]

export default function Onboarding({ onDone }) {
    const [currentIndx, setCurrentIdx] = useState(0)
    const flatListRef = useRef(null)

    const handleNext = () => {
        if (currentIndx < SLIDES.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndx + 1 });
            setCurrentIdx(currentIndx + 1);
        }
        else {
            onDone()
        }
    }

    const renderSlide = ({ item }) => {
        if (item.features) {
            return (
                <View style={{ width, padding: 32, justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 10, letterSpacing: 3, color: colors.gold, marginBottom: 24, fontFamily: 'DMSans_400Regular' }}>
                        WHAT I CAN DO
                    </Text>
                    {item.features.map((feature, i) => (
                        <View key={i} style={{ flexDirection: 'row', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
                            <View style={{
                                width: 44, height: 44, borderRadius: 22,
                                borderWidth: 0.5, borderColor: 'rgba(205,177,120,0.3)',
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Ionicons name={feature.icon} size={22} color={colors.gold} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 15, color: colors.cream, marginBottom: 4, fontFamily: 'DMSerifDisplay_400Regular' }}>
                                    {feature.title}
                                </Text>
                                <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 18, fontFamily: 'DMSans_400Regular' }}>
                                    {feature.example}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            );
        }

        return (
            <View style={{ width, padding: 32, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Ionicons name={item.emoji} size={22} color={colors.gold} />
                <Text style={{ fontSize: 32, color: colors.gold, marginBottom: 8, fontFamily: 'DMSerifDisplay_400Regular' }}>
                    {item.title}
                </Text>
                {item.subtitle && (
                    <Text style={{ fontSize: 10, letterSpacing: 3, color: colors.muted, marginBottom: 20, fontFamily: 'DMSans_400Regular' }}>
                        {item.subtitle}
                    </Text>
                )}
                <Text style={{ fontSize: 14, color: 'rgba(245,236,215,0.6)', textAlign: 'center', lineHeight: 22, fontFamily: 'DMSans_400Regular', marginBottom: 32 }}>
                    {item.description}
                </Text>
                {item.cta && (
                    <TouchableOpacity
                        onPress={onDone}
                        style={{ borderWidth: 1, borderColor: colors.gold, borderRadius: 40, paddingHorizontal: 36, paddingVertical: 14 }}
                    >
                        <Text style={{ fontSize: 11, letterSpacing: 2, color: colors.gold, fontFamily: 'DMSans_700Bold' }}>
                            LET'S BEGIN
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <ImageBackground
            source={{ uri: HERO_IMAGE }}
            style={{ flex: 1 }}
            imageStyle={{ opacity: 10 }}
        >
            <View style={{ position: 'absolute', inset: 0, backgroundColor: colors.bg, opacity: 0.85 }} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    data={SLIDES}
                    renderItem={renderSlide}
                    keyExtractor={item => item.id}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1 }}
                />

                {/* Dots and next button */}
                <View style={{ paddingBottom: 48, alignItems: 'center', gap: 24 }}>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        {SLIDES.map((_, i) => (
                            <View key={i} style={{
                                width: 8, height: 8, borderRadius: 4,
                                backgroundColor: i === currentIndx ? colors.gold : 'rgba(205,177,120,0.3)',
                            }} />
                        ))}
                    </View>

                    {currentIndx < SLIDES.length - 1 && (
                        <TouchableOpacity
                            onPress={handleNext}
                            style={{ borderWidth: 1, borderColor: colors.gold, borderRadius: 40, paddingHorizontal: 36, paddingVertical: 14 }}
                        >
                            <Text style={{ fontSize: 11, letterSpacing: 2, color: colors.gold, fontFamily: 'DMSans_700Bold' }}>
                                NEXT
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ImageBackground>
    );
}