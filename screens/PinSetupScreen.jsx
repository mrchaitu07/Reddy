import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

export default function PinSetupScreen({ navigation }) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1); // 1: Set PIN, 2: Confirm PIN
  const [error, setError] = useState("");
  
  // Animation values
  const pinDotsScale = useRef(pin.map(() => new Animated.Value(0))).current;
  const confirmDotsScale = useRef(confirmPin.map(() => new Animated.Value(0))).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  
  // Set up numpad
  const numpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "delete"];

  // Handle animation for PIN dots
  useEffect(() => {
    pin.forEach((digit, index) => {
      if (digit) {
        Animated.spring(pinDotsScale[index], {
          toValue: 1,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }).start();
      } else {
        pinDotsScale[index].setValue(0);
      }
    });
  }, [pin]);

  // Handle animation for confirm PIN dots
  useEffect(() => {
    confirmPin.forEach((digit, index) => {
      if (digit) {
        Animated.spring(confirmDotsScale[index], {
          toValue: 1,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }).start();
      } else {
        confirmDotsScale[index].setValue(0);
      }
    });
  }, [confirmPin]);

  const handleNumPress = (num) => {
    setError("");
    
    // Current PIN array based on step
    const currentPin = step === 1 ? pin : confirmPin;
    const setCurrentPin = step === 1 ? setPin : setConfirmPin;
    
    if (num === "delete") {
      // Remove last digit
      const lastFilledIndex = currentPin.findIndex(digit => digit !== "");
      if (lastFilledIndex >= 0) {
        const newPin = [...currentPin];
        newPin[lastFilledIndex] = "";
        setCurrentPin(newPin);
      }
      return;
    }
    
    // Find the first empty spot in the pin array
    const emptyIndex = currentPin.findIndex(digit => digit === "");
    if (emptyIndex !== -1) {
      const newPin = [...currentPin];
      newPin[emptyIndex] = num.toString();
      setCurrentPin(newPin);
      
      // If this completes the PIN entry for step 1, move to step 2
      if (step === 1 && emptyIndex === 3) {
        setTimeout(() => {
          setStep(2);
        }, 300);
      }
      
      // If this completes the PIN confirmation, verify and proceed
      if (step === 2 && emptyIndex === 3) {
        setTimeout(() => {
          verifyPins(newPin);
        }, 300);
      }
    }
  };

  const verifyPins = (currentConfirmPin) => {
    const pinStr = pin.join("");
    const confirmPinStr = currentConfirmPin ? currentConfirmPin.join("") : confirmPin.join("");
    
    if (pinStr === confirmPinStr) {
      // Pins match, navigate to success screen
      navigation.navigate("SuccessScreen", {
        message: "PIN Set Successfully!",
        description: "Your 4-digit PIN has been created.",
        destination: "SetupAccount",
        params: { pinSetupCompleted: true }
      });
    } else {
      // Pins don't match, show error and shake animation
      setError("PINs don't match. Please try again.");
      setConfirmPin(["", "", "", ""]);
      
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    }
  };

  const resetPinSetup = () => {
    setPin(["", "", "", ""]);
    setConfirmPin(["", "", "", ""]);
    setStep(1);
    setError("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#6D28D9" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.headerContainer,
            { transform: [{ translateX: shakeAnimation }] }
          ]}
        >
          <Text style={styles.title}>
            {step === 1 ? "Set up your PIN" : "Confirm your PIN"}
          </Text>
          <Text style={styles.subtitle}>
            {step === 1 
              ? "Create a 4-digit PIN for account security" 
              : "Re-enter your PIN to confirm"
            }
          </Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </Animated.View>
        
        <View style={styles.dotsContainer}>
          {step === 1 ? (
            <View style={styles.pinDotsRow}>
              {pin.map((digit, index) => (
                <Animated.View 
                  key={`pin-${index}`}
                  style={[
                    styles.pinDot,
                    { transform: [{ scale: pinDotsScale[index] }] }
                  ]}
                >
                  {digit !== "" && <View style={styles.filledDot} />}
                </Animated.View>
              ))}
            </View>
          ) : (
            <View style={styles.pinDotsRow}>
              {confirmPin.map((digit, index) => (
                <Animated.View 
                  key={`confirm-${index}`}
                  style={[
                    styles.pinDot,
                    { transform: [{ scale: confirmDotsScale[index] }] }
                  ]}
                >
                  {digit !== "" && <View style={styles.filledDot} />}
                </Animated.View>
              ))}
            </View>
          )}
        </View>
        
        {step === 2 && (
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetPinSetup}
          >
            <Text style={styles.resetText}>Reset PIN</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.numpadContainer}>
          {numpad.map((num, index) => (
            <TouchableOpacity
              key={`numpad-${index}`}
              style={[
                styles.numButton, 
                num === null && styles.emptyButton,
                num === "delete" && styles.deleteButton
              ]}
              onPress={() => num !== null && handleNumPress(num)}
              disabled={num === null}
              activeOpacity={num === null ? 1 : 0.7}
            >
              {num === "delete" ? (
                <Icon name="backspace-outline" size={24} color="#6D28D9" />
              ) : num !== null ? (
                <Text style={styles.numText}>{num}</Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    padding: 15,
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  errorText: {
    color: "#f44336",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  dotsContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  pinDotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6D28D9",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filledDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6D28D9",
  },
  resetButton: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetText: {
    color: "#6D28D9",
    fontSize: 14,
  },
  numpadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginTop: 20,
  },
  numButton: {
    width: width * 0.25,
    height: width * 0.25,
    maxWidth: 90,
    maxHeight: 90,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 45,
    backgroundColor: "#f0ebfa",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  emptyButton: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  deleteButton: {
    backgroundColor: "#f5f5f5",
  },
  numText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6D28D9",
  },
}); 