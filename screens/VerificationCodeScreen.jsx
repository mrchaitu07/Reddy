import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";

export default function VerificationCodeScreen({ navigation, route }) {
  const { phoneNumber = "+0 000 000 0000" } = route.params || {};
  const [code, setCode] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  // Handle code input
  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Auto-advance to next input
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleProceed = () => {
    // Simple validation to check if all code fields are filled
    if (code.some(digit => !digit)) {
      alert("Please enter all 4 digits");
      return;
    }

    setIsVerifying(true);
    const fullCode = code.join('');
    console.log("Verification code submitted:", fullCode);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      // Navigate to success screen instead of directly back to setup screen
      navigation.navigate("VerificationSuccess");
    }, 1500);
  };

  const handleResendCode = () => {
    console.log("Resending code to:", phoneNumber);
    // Reset the code fields
    setCode(['', '', '', '']);
    // Focus on the first input
    inputRefs.current[0].focus();
    // Show alert for demo purposes
    alert(`Verification code resent to ${phoneNumber}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Verification Code</Text>
        
        <View style={styles.imageContainer}>
          {/* Placeholder for verification image */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>📱</Text>
          </View>
        </View>
        
        <Text style={styles.instruction}>
          Kindly input the 4-digit Code code we have sent to at{' '}
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>.
        </Text>
        
        <View style={styles.codeContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={code[index]}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              editable={!isVerifying}
            />
          ))}
        </View>
        
        <View style={styles.resendContainer}>
          <Text style={styles.noCodeText}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={isVerifying}>
            <Text style={[styles.resendText, isVerifying && styles.disabledText]}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, isVerifying && styles.disabledButton]}
          onPress={handleProceed}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Proceed</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
    color: '#333',
  },
  imageContainer: {
    marginBottom: 40,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 40,
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  phoneNumber: {
    color: '#6C63FF',
    fontWeight: '500',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    textAlign: 'center',
    fontSize: 24,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  noCodeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resendText: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '500',
  },
  disabledText: {
    color: '#b3b3b3',
  },
  button: {
    backgroundColor: '#6C63FF',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 