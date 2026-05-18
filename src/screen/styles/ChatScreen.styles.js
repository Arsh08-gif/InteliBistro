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
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    color: colors.cream,
    fontSize: 22,
    fontFamily: 'DMSerifDisplay_400Regular',
  },
  headerSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '82%',
    marginBottom: 12,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.gold,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  userText: {
    color: colors.bg,
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'DMSans_400Regular',
  },
  aiText: {
    color: colors.cream,
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'DMSans_400Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.cream,
    fontSize: 15,
    borderWidth: 0.5,
    borderColor: colors.border,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.card,
  },
  sendButtonText: {
    color: colors.bg,
    fontSize: 18,
    fontWeight: '700',
  },
});