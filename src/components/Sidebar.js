import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { colors } from '../constants/colors';

const LINKS = ['Home', 'Menu', 'Cart', 'Reserve', 'Chat']

export default function Sidebar({ visible, onClose, onNavigate }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, flexDirection: 'row' }}>

                {/* Left dim area — tap to close */}
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'rgba(13,31,28,0.6)' }}
                    onPress={onClose}
                />

                {/* Sidebar panel */}
                <View style={{
                    width: '60%',
                    backgroundColor: colors.card,
                    paddingTop: 60,
                    paddingHorizontal: 28,
                    paddingBottom: 40,
                    justifyContent: 'space-between',
                }}>
                    {/* Close button */}
                    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', marginBottom: 40 }}>
                        <Text style={{ color: colors.muted, fontSize: 18 }}>✕</Text>
                    </TouchableOpacity>

                    {/* Nav links */}
                    <View style={{ flex: 1, gap: 28 }}>
                        {LINKS.map(link => (
                            <TouchableOpacity key={link} onPress={() => { onNavigate(link); onClose(); }}>
                                <Text style={{ fontSize: 24, color: colors.cream, fontWeight: '600' }}>
                                    {link}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer */}
                    <View>
                        <View style={{ width: 32, height: 0.5, backgroundColor: colors.gold, marginBottom: 10 }} />
                        <Text style={{ fontSize: 9, color: colors.muted, letterSpacing: 2 }}>THE INTELLIGENT BISTRO</Text>
                    </View>

                </View>
            </View>
        </Modal>
    );
}