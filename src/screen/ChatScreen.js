import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendChat, fetchMenu, placeorder } from '../api/bistroApi';
import useCartStore from '../store/cartStore';
import styles from './styles/ChatScreen.styles';
import { colors } from '../constants/colors';

const INITIAL_MESSAGE = {
    id: '0',
    role: 'assistant',
    content: "Hey! I'm your AI server 🍽️ Here to assist you!",
}

export default function ChatScreen() {
    // setting state
    const [messages, setMessages] = useState([INITIAL_MESSAGE])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [menu, setMenu] = useState([])
    const scrollRef = useRef(null)

    // fetching store
    const cart = useCartStore(state => state.cart)
    const addItem = useCartStore(state => state.addItem)
    const removeItem = useCartStore(state => state.removeItem)
    const updateQty = useCartStore(state => state.updateQty)
    const addReservation = useCartStore(state => state.addReservation)
    const cancelReservation = useCartStore(state => state.cancelReservation)
    const reservations = useCartStore(state => state.reservations)
    const clearcart = useCartStore(state => state.clearCart)
    

    useEffect(() => {
        fetchMenu().then(setMenu).catch(err => console.error('Error ', err));
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollToEnd({ animated: true })
    }, [messages])

    const applyActions = async (actions) => {
        console.log('inside apply actions : ', actions);

        for (const action of actions) {
            console.log('action : ', action.type);

            if (action.type === 'add') {
                const menuItem = menu.find(m => m.id === action.itemId)
                if (!menuItem) return
                console.log('menuItem : ', menuItem);
                addItem(menuItem, action.qty)
            }
            else if (action.type === 'remove') {
                removeItem(action.itemId)
            }
            else if (action.type === 'update_qty') {
                updateQty(action.itemId, action.qty)
            }
            else if (action.type === 'reserve') {
                console.log('reserve action received:', action);
                addReservation({
                    id: `BST-${Math.floor(Math.random() * 100)}`,
                    partySize: action.partySize,
                    time: action.time,
                    date: action.date
                })
            }
            else if (action.type === 'cancel_reservation') {
                console.log('action id : ', action.id);

                cancelReservation(action.id);
            }
            else if (action.type === 'place_order') {
                console.log('placng order');
                const result = await placeorder(cart)
        
                console.log('order placed ', result);
                clearcart();


            }

        }
    }

    const send = async () => {
        console.log('entered send');

        const trimmed = input.trim()
        if (!trimmed || loading) return
        const userMessage = { id: Date.now().toString(), role: 'user', content: trimmed }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            const response = await sendChat(trimmed, cart, messages, reservations)
            console.log('chat response : ', response);
            console.log('action : ', response.actions);


            await applyActions(response.actions)
            const aiMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.reply }
            setMessages(prev => [...prev, aiMessage])

        } catch (error) {
            const errorMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: `Cannot order right now! please come back later` }
            setMessages(prev => [...prev, errorMessage])
            console.log('send chat error : ', error);

        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 70 : 0}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>INTELLI SERVER </Text>
                    <Text style={styles.headerSubtitle}>Order in plain English</Text>
                </View>

                <ScrollView
                    ref={scrollRef}
                    style={styles.messagesContainer}
                    contentContainerStyle={{ paddingBottom: 16 }}
                >
                    {messages.map(msg => (
                        <View
                            key={msg.id}
                            style={[styles.messageBubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}
                        >
                            <Text style={msg.role === 'user' ? styles.userText : styles.aiText}>
                                {msg.content}
                            </Text>
                        </View>
                    ))}
                    {loading && (
                        <View style={[styles.messageBubble, styles.aiBubble]}>
                            <Text style={styles.aiText}>...</Text>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="Add two spicy sandwiches..."
                        placeholderTextColor={colors.muted}
                        style={styles.input}
                        multiline
                    />
                    <TouchableOpacity
                        onPress={send}
                        disabled={!input.trim() || loading}
                        style={[styles.sendButton, (!input.trim() || loading) && styles.sendButtonDisabled]}
                    >
                        <Text style={styles.sendButtonText}>↑</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

