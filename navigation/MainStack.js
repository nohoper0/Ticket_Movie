import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MovieHomeScreen from "../screens/MovieHomeScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import SeatSelectionScreen from "../screens/SeatSelectionScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import BookingConfirmedScreen from "../screens/BookingConfirmedScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MovieHomeScreen} />
      <Stack.Screen name="Detail" component={MovieDetailScreen} />
      <Stack.Screen name="Selection" component={SeatSelectionScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="BookingConfirmed" component={BookingConfirmedScreen} />
    </Stack.Navigator>
  );
}