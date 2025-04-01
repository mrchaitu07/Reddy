import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import SetupAccountScreen from "./screens/SetupAccountScreen";
import PhoneVerificationScreen from "./screens/PhoneVerificationScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SetupAccount" component={SetupAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
