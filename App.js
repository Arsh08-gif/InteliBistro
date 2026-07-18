import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { FleurDeLeah_400Regular } from '@expo-google-fonts/fleur-de-leah';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { useFonts } from '@expo-google-fonts/dm-serif-display';
import CustomTabBar from "./src/components/CustomTabBar";
import * as Font from 'expo-font';
import Onboarding from "./src/components/Onboarding";
import Toast from 'react-native-toast-message';

// importing the screens :
import HomeScreen from "./src/screen/HomeScreen";
import MenuScreen from "./src/screen/MenuScreen";
import ChatScreen from "./src/screen/ChatScreen";
import CartScreen from "./src/screen/CartScreen";
import ReservationScreen from "./src/screen/ReservationScreen";



const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    FleurDeLeah_400Regular,
    DMSerifDisplay_400Regular,
    DMSans_400Regular,
    DMSans_700Bold,
  });
  const [showOnboarding, setShowOnboarding] = useState(true)
  console.log(error);

  const handleDone = () => {
    console.log('onboarding done');
    setShowOnboarding(false);
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#0D1F1C' }} />;
  }

  if (showOnboarding) {
    return (
      <SafeAreaProvider>
        <Onboarding onDone={handleDone} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >

          <Tab.Screen name="Menu" component={MenuScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Reserve" component={ReservationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  )
}


