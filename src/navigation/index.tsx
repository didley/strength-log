/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ExercisesTab } from "../screens/ExercisesTab";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { SettingsTab } from "../screens/SettingsTab";
import { WorkoutsTab } from "../screens/WokoutsTab";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList, RootTabParamList } from "./navigation.types";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="WorkoutsTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="WorkoutsTab"
        component={WorkoutsTab}
        options={{
          headerTitle: "",
          headerTransparent: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="clipboard" color={color} />
          ),
          tabBarLabel: "Workouts",
        }}
      />
      <BottomTab.Screen
        name="ExercisesTab"
        component={ExercisesTab}
        options={{
          headerTitle: "",
          headerTransparent: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          tabBarLabel: "Exercises",
        }}
      />
      <BottomTab.Screen
        name="SettingsTab"
        component={SettingsTab}
        options={{
          headerTitle: "",
          headerTransparent: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
}) {
  return <Feather size={25} style={{ marginBottom: -3 }} {...props} />;
}
