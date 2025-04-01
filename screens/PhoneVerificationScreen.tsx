import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhoneVerificationScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('phone'); // 'phone' or 'verification'
  
  const validatePhoneNumber = () => {
    // Basic validation - can be enhanced for specific country formats
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };
  
  const validateVerificationCode = () => {
    // Basic validation for 6-digit code
    const codeRegex = /^[0-9]{6}$/;
    return codeRegex.test(verificationCode);
  };
  
  const handleSendCode = async () => {
    if (!validatePhoneNumber()) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to send verification code
    try {
      // Replace with actual API call to your auth service
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep('verification');
    } catch (error) {
      Alert.alert('Error', 'Failed to send verification code. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyCode = async () => {
    if (!validateVerificationCode()) {
      Alert.alert('Invalid Code', 'Please enter a valid 6-digit verification code');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to verify code
    try {
      // Replace with actual API call to your auth service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Try to navigate - replace 'SetupAccount' with your actual screen name
      try {
        // Use the correct screen name from your navigation stack
        // navigation.navigate('Login'); 
        // You may need to replace 'Setup' with whatever screen name you have in your navigation stack
      } catch (navigationError) {
        console.error('Navigation error:', navigationError);
        // Fallback if navigation fails
        Alert.alert('Verification Successful', 'Your phone number has been verified successfully.');
      }
      
    } catch (error) {
      Alert.alert('Error', 'Failed to verify code. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderPhoneInput = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Enter your phone number</Text>
      <Text style={styles.description}>
        We'll send you a verification code to confirm your identity
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="+1 (123) 456-7890"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        autoFocus
      />
      
      <TouchableOpacity
        style={[styles.button, !validatePhoneNumber() && styles.buttonDisabled]}
        onPress={handleSendCode}
        disabled={!validatePhoneNumber() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Verification Code</Text>
        )}
      </TouchableOpacity>
    </View>
  );
  
  const renderVerificationInput = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Verify your phone number</Text>
      <Text style={styles.description}>
        Enter the 6-digit code we sent to {phoneNumber}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="123456"
        keyboardType="number-pad"
        value={verificationCode}
        onChangeText={setVerificationCode}
        maxLength={6}
        autoFocus
      />
      
      <TouchableOpacity
        style={[styles.button, !validateVerificationCode() && styles.buttonDisabled]}
        onPress={handleVerifyCode}
        disabled={!validateVerificationCode() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify Code</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.textButton}
        onPress={() => {
          setVerificationCode('');
          setStep('phone');
        }}
      >
        <Text style={styles.textButtonText}>Change phone number</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.textButton}
        onPress={handleSendCode}
        disabled={isLoading}
      >
        <Text style={styles.textButtonText}>Resend code</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Phone Verification</Text>
          
          {step === 'phone' ? renderPhoneInput() : renderVerificationInput()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#A0C3FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textButton: {
    padding: 8,
  },
  textButtonText: {
    color: '#4285F4',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default PhoneVerificationScreen;