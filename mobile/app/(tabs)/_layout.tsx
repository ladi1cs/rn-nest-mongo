import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Size } from '@/constants/common';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <FontAwesome6 name="money-check-dollar" size={Size.icon.large} color={color} />
        }}
      />
      <Tabs.Screen
        name="beverage"
        options={{
          title: 'Beverages',
          tabBarIcon: ({ color }) => <Entypo name="drink" size={Size.icon.large} color={color} />
        }}
      />
       <Tabs.Screen
        name="beverageSize"
        options={{
          title: 'Sizes',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-size" size={Size.icon.large} color={color} />
        }}
      />
    </Tabs>
  );
}
