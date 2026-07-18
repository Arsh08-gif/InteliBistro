import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { placeorder } from '../api/bistroApi';
import useCartStore from '../store/cartStore';
import styles from './styles/CartScreen.styles';
import Toast from 'react-native-toast-message';

export default function CartScreen() {

    // fetching states from store
    const cart = useCartStore(state => state.cart)
    const updateQty = useCartStore(state => state.updateQty)
    const clearCart = useCartStore(state => state.clearCart)

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

    const place_order = async () => {
        try {
            console.log('placing order');
            const result = await placeorder(cart);
            console.log('order placed:', result);
            Toast.show({
                type: 'success',
                text1: 'Order Placed!',
                text2: 'Confirmation email sent to your inbox',
                visibilityTime: 3000,
            });
            clearCart();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Order Failed',
                text2: 'Please try again',
                visibilityTime: 3000,
            });
            console.log('order error:', error.message);
        }
    }

    if (cart.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>YOUR CART 🛒</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                </View>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Cart 🛒</Text>
            </View>

            <ScrollView style={styles.itemsContainer}>
                {cart.map(item => (
                    <View key={item.id} style={styles.itemCard}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
                        </View>
                        <View style={styles.qtyControls}>
                            <TouchableOpacity
                                style={styles.qtyButton}
                                onPress={() => updateQty(item.id, item.qty - 1)}
                            >
                                <Text style={{ color: '#fff', fontSize: 18 }}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{item.qty}</Text>
                            <TouchableOpacity
                                style={[styles.qtyButton, styles.qtyButtonAdd]}
                                onPress={() => updateQty(item.id, item.qty + 1)}
                            >
                                <Text style={{ color: '#fff', fontSize: 18 }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    onPress={place_order}
                    style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
