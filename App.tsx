import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import SetupAccountScreen from "./screens/SetupAccountScreen";
import PhoneVerificationScreen from "./screens/PhoneVerificationScreen";
import VerificationCodeScreen from "./screens/VerificationCodeScreen";
import PhoneInputScreen from "./screens/PhoneInputScreen";
import VerificationSuccessScreen from "./screens/VerificationSuccessScreen";
import SuccessScreen from "./screens/SuccessScreen";
import PinSetupScreen from "./screens/PinSetupScreen";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import ApplyLoanScreen from "./screens/ApplyLoanScreen";
import LoanRequestScreen from "./screens/LoanRequestScreen";
import LoanSubmitScreen from "./screens/LoanSubmitScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SetupAccount" component={SetupAccountScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PhoneInput" component={PhoneInputScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VerificationSuccess" component={VerificationSuccessScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PinSetup" component={PinSetupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen 
            name="ApplyLoan" 
            component={ApplyLoanScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="LoanRequest" 
            component={LoanRequestScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="LoanSubmit" 
            component={LoanSubmitScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
