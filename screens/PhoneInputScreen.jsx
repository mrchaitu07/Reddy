import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";

export default function PhoneInputScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendCode = () => {
    // Validate phone number (simple validation)
    if (phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    
    // Navigate to verification code screen with the phone number
    navigation.navigate("VerificationCode", { phoneNumber });
  };

  const handleChooseSMS = () => {
    // For demo purposes, just navigate to verification screen
    if (phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    navigation.navigate("VerificationCode", { phoneNumber });
  };

  const handleChooseWhatsapp = () => {
    // For demo purposes, just navigate to verification screen
    if (phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    navigation.navigate("VerificationCode", { phoneNumber });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create your Account</Text>
          <Text style={styles.subtitle}>Enter your BVN and other details to sign up</Text>
          <Text style={styles.blueText}>*use the phone number linked to your BVN & NIN*</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Bank Verification Number (BVN)</Text>
            <TextInput
              style={styles.input}
              placeholder="12345678901234567"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              editable={false}
              value="12534166451107817"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>National Identification Number</Text>
            <TextInput
              style={styles.input}
              placeholder="2354748999"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              editable={false}
              value="2354748999"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+2349034568667"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              autoFocus
            />
          </View>

          {phoneNumber.length >= 10 && (
            <View style={styles.verificationOptionsModal}>
              <Text style={styles.modalTitle}>Choose mobile number verification method</Text>
              
              <TouchableOpacity style={styles.verificationOption} onPress={handleChooseSMS}>
                <Text style={styles.verificationOptionText}>Verify with SMS</Text>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.verificationOption} onPress={handleChooseWhatsapp}>
                <Text style={styles.verificationOptionText}>Verify with Whatsapp</Text>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {phoneNumber.length < 10 && (
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSendCode}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.loginContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signInText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.disclaimer}>
            Your BVN & NIN is completely secure and we only need it for the purpose 
            of identity verification. Your BVN does not give us access to your financial 
            data.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  blueText: {
    fontSize: 14,
    color: '#6C63FF',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  accountText: {
    color: '#666',
    fontSize: 14,
  },
  signInText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 24,
  },
  verificationOptionsModal: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  verificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  verificationOptionText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 20,
    color: '#6C63FF',
  },
}); 