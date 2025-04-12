import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("choice@yahoo.com");
  const [password, setPassword] = useState("••••••••••");

  const handleLogin = () => {
    console.log("Login clicked with:", email, password);
    // Navigate to SetupAccountScreen
    navigation.navigate("SetupAccount");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.imageContainer}>
          <View style={styles.profileImagePlaceholder}>
            {/* You can place an Image component here once you have your assets folder */}
          </View>
          <View style={styles.imageCutout} />
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.subtitleText}>Sign in to Continue</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          
          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
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
  content: {
    flex: 1,
  },
  imageContainer: {
    height: '40%',
    position: 'relative',
    backgroundColor: '#f8f9fa',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e9ecef', // Light gray color as placeholder
  },
  imageCutout: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  noAccountText: {
    color: '#888',
    fontSize: 14,
  },
  signupText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
