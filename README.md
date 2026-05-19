# Manara — Mobile App

React Native (Expo) mobile app for the Manara intelligent restaurant experience. Order food, make reservations, and explore the menu — all through natural conversation with an AI.
## Download
 
[![Download APK](https://img.shields.io/badge/Download-APK-green?style=for-the-badge&logo=android)](https://github.com/Arsh08-gif/InteliBistro/releases/download/v1.0.0/application-af13648d-dba8-4e94-bc9e-f49d6b9bc246.apk)
 
> **Install instructions:** Download the APK, enable "Install from unknown sources" in Android settings if prompted, and install.


## Screen Shots
<img width="150"  alt="Starter Screen" src="https://github.com/user-attachments/assets/c9c35607-b62d-4109-ace5-ab30296432ab" />
<img width="150"  alt="Menu Screen" src="https://github.com/user-attachments/assets/d5d33415-a098-48db-9205-dede8b66d638" />
<img width="150"  alt="Chat Screen" src="https://github.com/user-attachments/assets/8d89afaf-3568-4f4d-9712-924db5fb74ee" />
<img width="150"  alt="Reservation Screen" src="https://github.com/user-attachments/assets/b20dab21-b1fe-4654-8a21-e1f9b128596b" />
<img width="150"  alt="Cart Screen" src="https://github.com/user-attachments/assets/64c0d44e-469f-4a3c-97f5-a96253db834d" />


## Data Flow
 
```
Android App
    │
    ├── GET /api/menu ──────────────► Node.js (Railway)
    │                                  └── returns menu.json
    │
    ├── POST /api/chat ─────────────► Node.js (Railway)
    │   { message, cart,               └── calls Groq API
    │     history, reservations }            └── LLaMA 3.3 70B
    │                                              └── returns JSON
    │                               { reply, actions[] }
    │                                    │
    │                               App parses actions
    │                               └── updates Zustand store
    │                                   (cart + reservations)
    │
    └── POST /api/order ────────────► Node.js (Railway)
        { cart }                       └── calls Resend API
                                            └── sends email
```
 
## AI Chat Flow
 
```
User: "Add two spicy chicken sandwiches and a water"
      ↓
POST /api/chat
{
  message: "Add two spicy chicken sandwiches and a water",
  cart: [...],          ← current cart state
  history: [...],       ← last 10 messages for context
  reservations: [...]   ← current reservations
}
      ↓
Backend builds system prompt with full menu + context
      ↓
Groq LLaMA 3.3 70B processes natural language
      ↓
Returns structured JSON:
{
  "reply": "Added two Spicy Chicken Sandwiches and a Large Water!",
  "actions": [
    { "type": "add", "itemId": "burger-2", "qty": 2 },
    { "type": "add", "itemId": "drink-2", "qty": 1 }
  ]
}
      ↓
applyActions() → Zustand store updates
Cart syncs across all screens in real time
```


## Features
 
-  **AI ordering** — natural language cart management via Groq LLaMA 3.3 70B
-  **Smart reservations** — max 3 bookings per slot per day
-  **Email confirmation** — HTML order confirmation via Resend
-  **Premium UI** — Yayoi-inspired dark teal palette with glassmorphism
-  **Custom fonts** — FleurDeLeah + DM Serif Display + DM Sans
-  **Haptic feedback** +  **Animated cart badge**
-  **Onboarding flow** — 3-screen first launch experience

###  Design
- Yayoi-inspired dark teal palette
- Custom font hierarchy: FleurDeLeah + DM Serif Display + DM Sans
- Custom bottom navigation with Ionicons outline icons
- Glassmorphism effects throughout
- Onboarding flow on first launch

## Tech Stack

- **React Native** + **Expo SDK 55**
- **Zustand** — global state (cart, reservations, chat history)
- **React Navigation** — bottom tab navigation with custom tab bar
- **Expo Vector Icons** (Ionicons) — outline icon set
- **expo-font** + **@expo-google-fonts** — custom typography
- **expo-haptics** — haptic feedback
- **expo-mail-composer** — email fallback
- **@react-native-community/datetimepicker** — date picker

## Project Structure

```
bistro-app/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js         ← hero, specials, stats
│   │   ├── MenuScreen.js         ← glassmorphism menu with categories
│   │   ├── CartScreen.js         ← cart with qty controls and total
│   │   ├── ChatScreen.js         ← AI conversational interface
│   │   ├── ReservationScreen.js  ← time slots and reservation cards
│   │   └── styles/               ← per-screen StyleSheet files
│   ├── components/
│   │   ├── CustomTabBar.js       ← custom bottom nav with badge + animation
│   │   ├── Sidebar.js            ← hamburger menu sidebar
│   │   └── Onboarding.js         ← 3-screen first launch flow
│   ├── store/
│   │   └── cartStore.js          ← Zustand store (cart + reservations)
│   ├── api/
│   │   └── bistroApi.js          ← fetch wrappers for backend API
│   └── constants/
│       ├── colors.js             ← Yayoi-inspired color palette
│       └── fonts.js              ← font family constants
├── assets/
│   └── fonts/                    ← TTF font files
├── App.js                        ← root, font loading, navigation
└── package.json
```

## Screens

| Screen | Description |
|--------|-------------|
| Home | Hero image, today's specials, restaurant stats |
| Menu | Category tabs, glassmorphism item list with food images |
| Cart | Items, quantity controls, tax, place order |
| Chat | AI conversational interface for ordering and reservations |
| Reserve | Time slot grid, date picker, glass reservation cards |


## Setup

```bash
# Install dependencies
npm install

# Start Expo dev server
npx expo start --lan
```

Scan the QR code with **Expo Go** on your Android or iOS device.

> **Note:** Make sure your phone and Mac are on the same WiFi network.
> Update `BASE_URL` in `src/api/bistroApi.js` with your Mac's local IP:
> ```js
> const BASE_URL = 'http://YOUR_MAC_IP:3001';
> ```
> Find your IP with: `ipconfig getifaddr en0`

## Environment

Powered by [Manara Backend](https://github.com/Arsh08-gif/IntelliBistro-backend) — deployed on Railway.
Backend Repo https://github.com/Arsh08-gif/IntelliBistro-backend
