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
    paddingBottom: 16,
  },
  headerTitle: {
    color: colors.cream,
    fontSize: 28,
    fontFamily: 'DMSerifDisplay_400Regular',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.muted,
    fontSize: 16,
    marginTop: 12,
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: colors.cream,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'DMSerifDisplay_400Regular',
  },
  itemPrice: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    fontFamily: 'DMSans_700Bold',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  qtyButtonAdd: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  qtyText: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: '700',
    minWidth: 20,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: colors.surface,
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    gap: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'DMSerifDisplay_400Regular',
  },
  totalAmount: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'DMSans_700Bold',
  },
  orderButton: {
    backgroundColor: colors.gold,
    borderRadius: 40,
    paddingVertical: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    color: colors.bg,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily: 'DMSans_700Bold',
  },
});