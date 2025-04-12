import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const steps = [
  { id: "1", title: "Personal Information", description: "Security number and date of birth", icon: "account-circle" },
  { id: "2", title: "Phone Number", description: "Enter and verify your number", icon: "phone" },
  { id: "3", title: "PIN", description: "Set up your PIN", icon: "lock" },
  { id: "4", title: "Additional Information", description: "Security number and date of birth", icon: "file-document-outline" },
  { id: "5", title: "Document", description: "Document for verify identity", icon: "file-check-outline" },
];

const REQUIRED_STEPS = [1, 2, 3]; // Personal Info, Phone Number, and PIN are required

export default function SetupAccountScreen({ navigation, route }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [animateStep, setAnimateStep] = useState(null);
  const checkmarkScale = new Animated.Value(0);

  // Handle route params to check for completed steps
  useEffect(() => {
    // Handle phone verification completion
    if (route.params?.phoneVerified) {
      if (!completedSteps.includes(2)) {
        const newCompletedSteps = [...completedSteps, 2];
        setCompletedSteps(newCompletedSteps);
        setAnimateStep(2);
        
        Animated.spring(checkmarkScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            checkmarkScale.setValue(0);
            setAnimateStep(null);
          }, 1000);
        });
      }
    }

    // Handle personal info completion
    if (route.params?.personalInfoCompleted) {
      if (!completedSteps.includes(1)) {
        const newCompletedSteps = [...completedSteps, 1];
        setCompletedSteps(newCompletedSteps);
        setAnimateStep(1);
        
        Animated.spring(checkmarkScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            checkmarkScale.setValue(0);
            setAnimateStep(null);
          }, 1000);
        });
      }
    }
    
    // Handle PIN setup completion
    if (route.params?.pinSetupCompleted) {
      if (!completedSteps.includes(3)) {
        const newCompletedSteps = [...completedSteps, 3];
        setCompletedSteps(newCompletedSteps);
        setAnimateStep(3);
        
        Animated.spring(checkmarkScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            checkmarkScale.setValue(0);
            setAnimateStep(null);
          }, 1000);
        });
      }
    }
  }, [route.params?.phoneVerified, route.params?.personalInfoCompleted, route.params?.pinSetupCompleted]);

  const handleStepPress = (stepIndex) => {
    setCurrentStep(stepIndex + 1);
    
    // Navigate based on which step was clicked
    if (stepIndex === 0) { // Personal Information step
      navigation.navigate("PersonalInfo");
    } else if (stepIndex === 1) { // Phone Number step
      navigation.navigate("PhoneInput");
    } else if (stepIndex === 2) { // PIN step
      navigation.navigate("PinSetup");
    }
  };

  const renderCheckmark = (index) => {
    if (animateStep === index + 1) {
      return (
        <Animated.View style={{ 
          transform: [{ scale: checkmarkScale }],
        }}>
          <Icon name="check" size={14} color="white" />
        </Animated.View>
      );
    } else if (completedSteps.includes(index + 1)) {
      return <Icon name="check" size={14} color="white" />;
    }
    return null;
  };

  const handleNextPress = () => {
    // Navigate directly to HomeScreen without checking step completion
    navigation.replace("HomeScreen", { userName: "Joshua" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Up your Account</Text>

      {/* Step Indicator & List */}
      <FlatList
        data={steps}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            style={[
              styles.stepContainer, 
              (index < currentStep || completedSteps.includes(index + 1)) && styles.activeStep,
              animateStep === index + 1 && styles.animatingStep
            ]} 
            onPress={() => handleStepPress(index)}
          >
            {/* Step Indicator */}
            <View style={styles.stepIndicatorContainer}>
              <View style={[
                styles.circle, 
                (index < currentStep || completedSteps.includes(index + 1)) && styles.activeCircle
              ]}>
                {renderCheckmark(index)}
              </View>
              {index !== steps.length - 1 && <View style={styles.line} />}
            </View>

            {/* Step Details */}
            <View style={styles.stepDetails}>
              <Icon name={item.icon} size={24} color="#6D28D9" style={styles.icon} />
              <View>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDescription}>{item.description}</Text>
              </View>
            </View>

            {/* Right Arrow */}
            <Icon name="chevron-right" size={24} color="#6D28D9" />
          </TouchableOpacity>
        )}
      />

      {/* Next Button */}
      <TouchableOpacity 
        style={[
          styles.nextButton,
          REQUIRED_STEPS.every(step => completedSteps.includes(step)) && styles.completeButton
        ]} 
        onPress={handleNextPress}
      >
        <Text style={styles.nextButtonText}>
          {REQUIRED_STEPS.every(step => completedSteps.includes(step)) 
            ? "Go to Dashboard" 
            : "Next →"
          }
        </Text>
      </TouchableOpacity>
      
      {/* Status indicator for debugging */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>
          Completed Steps: {completedSteps.join(', ')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8FC",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6D28D9",
    marginBottom: 20,
    textAlign: "center",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  activeStep: {
    backgroundColor: "#EDE7F6",
  },
  animatingStep: {
    backgroundColor: "#D1C4E9",
  },
  stepIndicatorContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6D28D9",
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    backgroundColor: "#6D28D9",
  },
  line: {
    width: 2,
    height: 30,
    backgroundColor: "#6D28D9",
    position: "absolute",
    top: 26,
    left: 10,
  },
  stepDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6D28D9",
  },
  stepDescription: {
    fontSize: 12,
    color: "#777",
  },
  nextButton: {
    backgroundColor: "#6D28D9",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  debugContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 5,
  },
  debugText: {
    fontSize: 12,
    color: "#666",
  }
});
