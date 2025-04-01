import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const steps = [
  { id: "1", title: "Personal Information", description: "Security number and date of birth", icon: "account-circle" },
  { id: "2", title: "Phone Number", description: "Enter and verify your number", icon: "phone" },
  { id: "3", title: "PIN", description: "Set up your PIN", icon: "lock" },
  { id: "4", title: "Additional Information", description: "Security number and date of birth", icon: "file-document-outline" },
  { id: "5", title: "Document", description: "Document for verify identity", icon: "file-check-outline" },
];

export default function SetupAccountScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Up your Account</Text>

      {/* Step Indicator & List */}
      <FlatList
        data={steps}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            style={[styles.stepContainer, index < currentStep ? styles.activeStep : null]} 
            onPress={() => setCurrentStep(index + 1)}
          >
            {/* Step Indicator */}
            <View style={styles.stepIndicatorContainer}>
              <View style={[styles.circle, index < currentStep ? styles.activeCircle : null]}>
                {index < currentStep && <Icon name="check" size={14} color="white" />}
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
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("PersonalInfo")}>
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>
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
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
