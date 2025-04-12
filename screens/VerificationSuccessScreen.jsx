import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";

export default function VerificationSuccessScreen({ navigation }) {
  const checkmarkSize = new Animated.Value(0);
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef(null);
  const navigationPerformed = useRef(false);
  
  useEffect(() => {
    // Animate the checkmark when the component mounts
    Animated.spring(checkmarkSize, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Start the countdown for automatic redirection
    timerRef.current = setInterval(() => {
      setCountdown((prevCount) => {
        const newCount = prevCount - 1;
        return newCount;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }; // Clean up on unmount
  }, []);

  // Handle navigation in a separate effect that runs when countdown changes
  useEffect(() => {
    if (countdown <= 0 && !navigationPerformed.current) {
      // Clear interval
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Set flag to prevent multiple navigation calls
      navigationPerformed.current = true;
      // Use setTimeout to ensure this happens after render
      setTimeout(() => {
        navigation.navigate("SetupAccount", { phoneVerified: true });
      }, 0);
    }
  }, [countdown, navigation]);

  const handleProceed = () => {
    // Clear any existing timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Set flag to prevent auto-navigation
    navigationPerformed.current = true;
    
    // Navigate back to SetupAccount with phoneVerified flag immediately
    navigation.navigate("SetupAccount", { phoneVerified: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.checkmarkContainer,
            { transform: [{ scale: checkmarkSize }] }
          ]}
        >
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        </Animated.View>

        <Text style={styles.title}>Mobile Number Verified!</Text>
        <Text style={styles.description}>
          Your mobile number has been verified successfully.
          {countdown > 0 ? `Redirecting in ${countdown} seconds...` : 'Redirecting...'}
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleProceed}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  checkmarkContainer: {
    marginBottom: 40,
  },
  checkmark: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 70,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#6C63FF',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 