import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    headerSubtitle: {
        fontSize: 9,
        letterSpacing: 3,
        color: colors.gold,
    },
    headerTitle: {
        fontSize: 26,
        color: colors.cream,
        fontFamily: 'DMSerifDisplay_400Regular',
    },
    headerDesc: {
        fontSize: 11,
        color: colors.muted,
        marginTop: 6,
    },
    glassSlab: {
        margin: 16,
        backgroundColor: 'rgba(2, 44, 50, 1)',
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: 'rgba(205,177,120,0.2)',
        padding: 16,
        gap: 14,
    },
    fieldLabel: {
        fontSize: 9,
        letterSpacing: 2,
        color: colors.gold,
        marginBottom: 6,
    },
    fieldInput: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 0.5,
        borderColor: 'rgba(205,177,120,0.2)',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fieldText: {
        fontSize: 13,
        color: colors.cream,
        fontFamily: 'DMSans_400Regular',
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    flex1: {
        flex: 1,
    },
    slotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    slot: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'rgba(205,177,120,0.2)',
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
    slotActive: {
        borderColor: colors.gold,
        backgroundColor: 'rgba(205,177,120,0.15)',
    },
    slotText: {
        fontSize: 11,
        color: colors.muted,
    },
    slotTextActive: {
        color: colors.gold,
    },
    reserveButton: {
        borderWidth: 1,
        borderColor: colors.gold,
        borderRadius: 40,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 4,
    },
    reserveButtonText: {
        fontSize: 11,
        letterSpacing: 2,
        color: colors.gold,
        fontWeight: '600',
    },
    sectionLabel: {
        fontSize: 9,
        letterSpacing: 2,
        color: colors.gold,
        marginLeft: 16,
        marginBottom: 10,
    },
    card: {
        marginHorizontal: 16,
        backgroundColor: 'rgba(205,177,120,0.08)',
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: 'rgba(205,177,120,0.3)',
        padding: 16,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.cream,
        fontFamily: 'DMSerifDisplay_400Regular',
    },
    cardTime: {
        fontSize: 11,
        color: colors.gold,
        marginTop: 4,
        fontFamily: 'DMSans_400Regular',
    },
    cardBadge: {
        backgroundColor: 'rgba(205,177,120,0.15)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 0.5,
        borderColor: 'rgba(205,177,120,0.3)',
    },
    cardBadgeText: {
        fontSize: 9,
        color: colors.gold,
        letterSpacing: 1,
    },
    divider: {
        height: 0.5,
        backgroundColor: 'rgba(205,177,120,0.15)',
        marginBottom: 12,
    },
    cardDetails: {
        flexDirection: 'row',
        gap: 16,
    },
    cardDetailLabel: {
        fontSize: 9,
        color: colors.muted,
        letterSpacing: 1,
        marginBottom: 2,
    },
    cardDetailValue: {
        fontSize: 12,
        color: colors.cream,
    },
    slotFull: {
        borderColor: 'rgba(245,236,215,0.1)',
        backgroundColor: 'rgba(255,255,255,0.02)',
        opacity: 0.4,
    },
    slotTextFull: {
        color: 'rgba(245,236,215,0.2)',
        textDecorationLine: 'line-through',
    },
});