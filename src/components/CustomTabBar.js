import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import useCartStore from '../store/cartStore'

const TABS = [
    { name: 'Menu', center: false },
    { name: 'Cart', center: false },
    { name: 'Home', center: true },
    { name: 'Chat', center: false },
    { name: 'Reserve', center: false },
];

const getIcon = (name, size, color) => {
    switch (name) {
        case 'Menu': return <Ionicons name="restaurant-outline" size={size} color={color} />;
        case 'Cart': return <Ionicons name="cart-outline" size={size} color={color} />;
        case 'Home': return <Ionicons name="home-outline" size={size} color={color} />;
        case 'Chat': return <Ionicons name="chatbubble-outline" size={size} color={color} />;
        case 'Reserve': return <Ionicons name="calendar-outline" size={size} color={color} />;
    }
}

export default function CustomTabBar({ state, navigation }) {
    const cart = useCartStore(state => state.cart)
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
    const bounceAnim = useRef(new Animated.Value(1)).current
    useEffect(() => {
        if (cartCount > 0) {
            console.log('inside animation');

            Animated.sequence([
                Animated.timing(bounceAnim, { toValue: 1.4, duration: 150, useNativeDriver: true }),
                Animated.timing(bounceAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
            ]).start()
        }
    }, [cartCount])



    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#0D1F1C',
            borderTopWidth: 0.5,
            borderTopColor: 'rgba(205,177,120,0.15)',
            paddingHorizontal: 8,
            paddingBottom: 24,
            paddingTop: 12,
            alignItems: 'flex-end',
            justifyContent: 'space-around',
        }}>
            {TABS.map((tab) => {
                const isFocused = state.routes[state.index].name === tab.name;

                const onPress = () => navigation.navigate(tab.name);

                if (tab.center) {
                    return (
                        <TouchableOpacity
                            key={tab.name}
                            onPress={onPress}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 56,
                                height: 56,
                                borderRadius: 28,
                                borderWidth: 0.5,
                                borderColor: isFocused
                                    ? colors.gold
                                    : 'rgba(205,177,120,0.4)',
                                marginBottom: 4,
                            }}
                        >
                            <Text style={{ fontSize: 24 }}>{getIcon('Home', 26, isFocused ? colors.gold : 'rgba(245,236,215,0.5)')}</Text>
                        </TouchableOpacity>
                    );
                }

                if (tab.name === 'Cart') {

                    return (
                        <TouchableOpacity
                            key={tab.name}
                            onPress={onPress}
                            style={{ alignItems: 'center', gap: 4, paddingVertical: 4, width: 48 }}
                        >
                            <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
                                <View>
                                    {getIcon('Cart', 22, isFocused ? colors.gold : 'rgba(245,236,215,0.3)')}
                                    {cartCount > 0 && (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: -4,
                                                right: -8,
                                                backgroundColor: colors.gold,
                                                borderRadius: 8,
                                                minWidth: 16,
                                                height: 16,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text style={{ color: colors.bg, fontSize: 10, fontWeight: '700' }}>
                                                {cartCount}
                                            </Text>
                                        </View>
                                    )}

                                </View>
                            </Animated.View>
                            <Text style={{ fontSize: 8, letterSpacing: 1, color: isFocused ? colors.gold : 'rgba(245,236,215,0.25)' }}>CART</Text>
                        </TouchableOpacity>
                    )
                }

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={onPress}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4,
                            paddingVertical: 4,
                            width: 48,
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            opacity: isFocused ? 1 : 0.3,
                        }}>
                            {getIcon(tab.name, 22, isFocused ? colors.gold : 'rgba(245,236,215,0.3)')}
                        </Text>
                        <Text style={{
                            fontSize: 8,
                            letterSpacing: 1,
                            color: isFocused ? colors.gold : 'rgba(245,236,215,0.25)',
                        }}>
                            {tab.name.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}