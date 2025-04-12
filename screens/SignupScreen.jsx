import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";

export default function SignupScreen({ navigation }) {
  const [bvn, setBvn] = useState("");
  const [nin, setNin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignup = () => {
    console.log("Signup clicked with:", bvn, nin, phoneNumber);
    // Navigate to next screen or process signup
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create your Account</Text>
          <Text style={styles.subtitle}>Enter your BVN and other details to sign up</Text>
          <Text style={styles.blueText}>*use the phone number linked to your BVN & NIN*</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bank Verification Number (BVN)</Text>
            <TextInput
              style={styles.input}
              placeholder="12345678901234567"
              placeholderTextColor="#aaa"
              value={bvn}
              onChangeText={setBvn}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>National Identification Number</Text>
            <TextInput
              style={styles.input}
              placeholder="2354748999"
              placeholderTextColor="#aaa"
              value={nin}
              onChangeText={setNin}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+2349034568667"
              placeholderTextColor="#aaa"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signInText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            Your BVN & NIN is completely secure and we only need it for the purpose 
            of identity verification. Your BVN does not give us access to your financial 
            data. Kindly confirm from your bank.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
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
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
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
    marginTop: 24,
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
  disclaimerContainer: {
    marginTop: 'auto',
    paddingTop: 24,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#999',
    lineHeight: 18,
    textAlign: 'center',
  },
});
