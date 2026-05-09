import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import Ionicons
from "@expo/vector-icons/Ionicons";

import MovieHomeScreen
from "../screens/MovieHomeScreen";

import MovieDetailScreen
from "../screens/MovieDetailScreen";

import SearchScreen
from "../screens/SearchScreen";

import SeatSelectionScreen
from "../screens/SeatSelectionScreen";

import CheckoutScreen
from "../screens/CheckoutScreen";

import BookingConfirmedScreen
from "../screens/BookingConfirmedScreen";

import MyTicketsScreen
from "../screens/MyTicketsScreen";

import ProfileScreen
from "../screens/ProfileScreen";

import { COLORS }
from "../utils/colors";

const Stack =
  createNativeStackNavigator();

const Tab =
  createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor:
            COLORS.tab,

          borderTopWidth: 0,

          height: 70,

          paddingTop: 10,

          paddingBottom: 10,
        },

        tabBarActiveTintColor:
          COLORS.primary,

        tabBarInactiveTintColor:
          COLORS.inactive,

        tabBarLabelStyle: {
          fontSize: 12,
        },

        tabBarIcon: ({
          color,
          size,
          focused,
        }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "home"
              : "home-outline";
          }

          else if (
            route.name === "Search"
          ) {
            iconName = focused
              ? "search"
              : "search-outline";
          }

          else if (
            route.name === "Tickets"
          ) {
            iconName = focused
              ? "ticket"
              : "ticket-outline";
          }

          else if (
            route.name === "Profile"
          ) {
            iconName = focused
              ? "person"
              : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={MovieHomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Tickets"
        component={MyTicketsScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        animation:
          "slide_from_right",
      }}
    >
      <Stack.Screen
        name="HomeTab"
        component={BottomTabs}
      />

      <Stack.Screen
        name="Detail"
        component={MovieDetailScreen}
        options={{
          animation:
            "fade_from_bottom",
        }}
      />

      <Stack.Screen
        name="Selection"
        component={SeatSelectionScreen}
        options={{
          animation:
            "slide_from_bottom",
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          animation:
            "slide_from_right",
        }}
      />

      <Stack.Screen
        name="BookingConfirmed"
        component={BookingConfirmedScreen}
        options={{
          animation:
            "fade_from_bottom",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}