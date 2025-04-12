import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const steps = [
  { id: 1, title: 'Loan Details' },
  { id: 2, title: 'Personal Info' },
  { id: 3, title: 'Documents' },
  { id: 4, title: 'Review' },
];

export default function LoanApplicationScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const progressAnim = new Animated.Value(0);

  // Calculate progress width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, steps.length - 1],
    outputRange: ['0%', '100%'],
  });

  const moveToNextStep = () => {
    if (currentStep < steps.length) {
      Animated.timing(progressAnim, {
        toValue: currentStep,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setCurrentStep(currentStep + 1);
    }
  };

  const moveToPreviousStep = () => {
    if (currentStep > 1) {
      Animated.timing(progressAnim, {
        toValue: currentStep - 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Loan Details</Text>
            <Text style={styles.stepDescription}>
              Select your loan amount and tenure
            </Text>
            {/* Add your loan details form components here */}
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <Text style={styles.stepDescription}>
              Fill in your personal details
            </Text>
            {/* Add your personal info form components here */}
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Required Documents</Text>
            <Text style={styles.stepDescription}>
              Upload necessary documents
            </Text>
            {/* Add your document upload components here */}
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review Application</Text>
            <Text style={styles.stepDescription}>
              Review your application details
            </Text>
            {/* Add your review components here */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={moveToPreviousStep}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loan Application</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth,
              },
            ]}
          />
        </View>
        <View style={styles.stepsIndicator}>
          {steps.map((step, index) => (
            <View 
              key={step.id}
              style={[
                styles.stepIndicator,
                currentStep >= step.id && styles.activeStepIndicator,
              ]}
            >
              <Text 
                style={[
                  styles.stepNumber,
                  currentStep >= step.id && styles.activeStepNumber,
                ]}
              >
                {step.id}
              </Text>
              <Text style={styles.stepLabel}>{step.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {renderStepContent()}
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={moveToNextStep}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length ? 'Submit Application' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  progressContainer: {
    padding: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 2,
  },
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  stepIndicator: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  activeStepIndicator: {
    color: '#6C63FF',
  },
  activeStepNumber: {
    backgroundColor: '#6C63FF',
    color: '#fff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nextButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 