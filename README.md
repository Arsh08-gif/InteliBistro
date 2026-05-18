# Manara — Mobile App

React Native (Expo) mobile app for the Manara intelligent restaurant experience. Order food, make reservations, and explore the menu — all through natural conversation with an AI.
## Screen Shots
<img width="150"  alt="Starter Screen" src="https://github.com/user-attachments/assets/c9c35607-b62d-4109-ace5-ab30296432ab" />
<img width="150"  alt="Menu Screen" src="https://github.com/user-attachments/assets/d5d33415-a098-48db-9205-dede8b66d638" />
<img width="150"  alt="Chat Screen" src="https://github.com/user-attachments/assets/8d89afaf-3568-4f4d-9712-924db5fb74ee" />
<img width="150"  alt="Reservation Screen" src="https://github.com/user-attachments/assets/b20dab21-b1fe-4654-8a21-e1f9b128596b" />
<img width="150"  alt="Cart Screen" src="https://github.com/user-attachments/assets/64c0d44e-469f-4a3c-97f5-a96253db834d" />

## Features

###  AI-Powered Ordering
Chat naturally with the AI server to manage your order:
- "Add two spicy chicken sandwiches and a water"
- "Make the sandwich 3"
- "Remove the burger"
- "Place my order" — sends email confirmation

###  Smart Reservations
Book and manage tables through conversation or the reservation screen:
- "Book a table for 4 at 7pm tonight"
- "Cancel my reservation for 5 people"
- Max 3 reservations per slot per day
- Dynamic time slots from 12:00 PM to 9:00 PM

###  Menu Browsing
- Category tabs (Mains, Sides, Drinks, Desserts)
- Food photography from Unsplash
- Glassmorphism UI design
- Add items directly to cart

###  Cart Management
- Add, remove, update quantities
- Tax calculation
- Animated cart badge with bounce effect
- Haptic feedback on interactions

###  Email Confirmation
Order placed → confirmation email sent automatically via Resend

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

Requires the [Manara Backend](https://github.com/your-username/manara-backend) running locally on port 3001.
