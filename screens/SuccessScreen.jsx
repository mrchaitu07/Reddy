import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";

export default function SuccessScreen({ navigation, route }) {
  const { message, description, destination, params } = route.params || {};
  const checkmarkSize = new Animated.Value(0);
  const timer = useRef(null);
  
  useEffect(() => {
    // Animate the checkmark when the component mounts
    Animated.spring(checkmarkSize, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Set up automatic redirect after 3 seconds
    timer.current = setTimeout(() => {
      handleProceed();
    }, 3000);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const handleProceed = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    
    navigation.navigate(destination || "SetupAccount", params || {});
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

        <Text style={styles.title}>{message || "Success!"}</Text>
        <Text style={styles.description}>
          {description || "Your request has been processed successfully."}
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