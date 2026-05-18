import React, {useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import styles from './styles/ReserveScreen.styles';
import useCartStore from '../store/cartStore';
import DateTimePicker from '@react-native-community/datetimepicker';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const TIME_SLOTS = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM'
];
const PARTY_SIZE = ['1 guest', '2 guests', '3 guests', '4 guests', '5 guests', '6+ guests'];

export default function ReservationScreen() {
    // states :
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [partySize, setPartySize] = useState('2 guests')
    // const [reservations, setReservations] = useState([])
    const [showPartySizes, setShowPartySizes] = useState(false)
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false);


    const reservations = useCartStore(state => state.reservations);
    const addReservation = useCartStore(state => state.addReservation);


    const getSlotCount = (slot) => {
        const selectedDate = date.toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
        });
        console.log('comparing dates:', selectedDate, reservations.map(r => r.date));
        return reservations.filter(r => r.time === slot && r.date === selectedDate).length;
    };
    const isSlotFull = (slot) => {
        const count = getSlotCount(slot)
        console.log('slot count : ', count);
        return count >= 3
    }
    const handleReserve = () => {
        if (!selectedSlot) return;
        const slotFull = isSlotFull(selectedSlot)
        console.log('slot full : ', slotFull);
        if (slotFull) return;
        const newReservation = {
            id: `BST-${Math.floor(Math.random() * 100)}`,
            partySize,
            time: selectedSlot,
            date: date.toLocaleDateString('en-US', { month: 'long', day: '2-digit' })
        }
        // setReservations(prev => [newReservation, ...prev])
        addReservation(newReservation)
        setSelectedSlot(null)
    }


    return (
        <ImageBackground
            source={{ uri: HERO_IMAGE }}
            style={{ flex: 1 }}
            imageStyle={{ opacity: 3 }}
        >
            <View style={{ position: 'absolute', inset: 0, backgroundColor: colors.bg, opacity: 0.85 }} />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerSubtitle}>THE INTELLIGENT</Text>
                        <Text style={styles.headerTitle}>BOOK TABLE</Text>
                        <Text style={styles.headerDesc}>Select your details below</Text>
                    </View>

                    {/* Form glass slab */}
                    <View style={styles.glassSlab}>

                        {/* Party size */}
                        <View>
                            <Text style={styles.fieldLabel}>PARTY SIZE</Text>
                            <TouchableOpacity
                                style={styles.fieldInput}
                                onPress={() => setShowPartySizes(!showPartySizes)}
                            >
                                <Text style={styles.fieldText}>{partySize}</Text>
                                <Text style={{ color: colors.gold }}>∨</Text>
                            </TouchableOpacity>
                            {showPartySizes && PARTY_SIZE.map(size => (
                                <TouchableOpacity
                                    key={size}
                                    onPress={() => { setPartySize(size), setShowPartySizes(false) }}
                                    style={[styles.fieldInput, partySize === size && { borderColor: colors.gold }]}
                                >
                                    <Text style={styles.fieldText}>
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Date and time row */}
                        <View style={styles.row}>
                            <View style={styles.flex1}>
                                <Text style={styles.fieldLabel}>DATE</Text>
                                <TouchableOpacity
                                    style={styles.fieldInput}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Text style={styles.fieldText}>
                                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    minimumDate={new Date()}
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(false);
                                        if (selectedDate) setDate(selectedDate);
                                    }}
                                />
                            )}
                            <View style={styles.flex1}>
                                <Text style={styles.fieldLabel}>TIME</Text>
                                <View style={styles.fieldInput}>
                                    <Text style={styles.fieldText}>{selectedSlot || 'Select'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Time slots */}
                        <View>
                            <Text style={styles.fieldLabel}>AVAILABLE SLOTS</Text>
                            <View style={styles.slotsContainer}>
                                {TIME_SLOTS.map(slot => {
                                    const full = isSlotFull(slot)
                                    return (
                                        <TouchableOpacity
                                            key={slot}
                                            onPress={() => setSelectedSlot(slot)}
                                            style={[styles.slot, selectedSlot === slot && styles.slotActive, full && styles.slotFull]}
                                        >
                                            <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextActive, full && styles.slotFull]}>
                                                {slot}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>

                        {/* Reserve button */}
                        <TouchableOpacity
                            style={[styles.reserveButton, !selectedSlot && { opacity: 0.4 }]}
                            onPress={handleReserve}
                            disabled={!selectedSlot}
                        >
                            <Text style={styles.reserveButtonText}>RESERVE NOW</Text>
                        </TouchableOpacity>

                    </View>

                    {/* Reservations list */}
                    {reservations.length > 0 && (
                        <View style={{ marginBottom: 24 }}>
                            <Text style={styles.sectionLabel}>YOUR RESERVATIONS</Text>
                            {reservations.map(res => (
                                <View key={res.id} style={[styles.card, { marginBottom: 12 }]}>
                                    <View style={styles.cardTop}>
                                        <View>
                                            <Text style={styles.cardTitle}>Table for {res.partySize.split(' ')[0]}</Text>
                                            <Text style={styles.cardTime}>{res.date} · {res.time}</Text>
                                        </View>
                                        <View style={styles.cardBadge}>
                                            <Text style={styles.cardBadgeText}>CONFIRMED</Text>
                                        </View>
                                    </View>
                                    <View style={styles.divider} />
                                    <View style={styles.cardDetails}>
                                        <View>
                                            <Text style={styles.cardDetailLabel}>DATE</Text>
                                            <Text style={styles.cardDetailValue}>{res.date}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.cardDetailLabel}>GUESTS</Text>
                                            <Text style={styles.cardDetailValue}>{res.partySize}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.cardDetailLabel}>REF</Text>
                                            <Text style={styles.cardDetailValue}>#{res.id}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}