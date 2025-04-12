import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LoanRequestScreen({ navigation }) {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(6);
  const interestRate = 0.05; // 5%

  const calculateInterest = () => {
    return loanAmount * interestRate;
  };

  const calculateTotal = () => {
    return loanAmount + calculateInterest();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request a specific amount</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Fill in the following options to establish how much you want to borrow and how long.
      </Text>

      {/* Loan Amount Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Loan Amount</Text>
        <Text style={styles.selectedAmount}>NGN {loanAmount.toLocaleString()}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={22000}
          value={loanAmount}
          onValueChange={setLoanAmount}
          minimumTrackTintColor="white"
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          thumbTintColor="white"
        />
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeText}>NGN 0</Text>
          <Text style={styles.rangeText}>NGN 22,000</Text>
        </View>
      </View>

      {/* Loan Term Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Loan Term</Text>
        <Text style={styles.selectedDays}>{loanTerm} days</Text>
        <Slider
          style={styles.slider}
          minimumValue={6}
          maximumValue={30}
          value={loanTerm}
          onValueChange={setLoanTerm}
          minimumTrackTintColor="white"
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          thumbTintColor="white"
          step={1}
        />
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeText}>6 days</Text>
          <Text style={styles.rangeText}>30 days</Text>
        </View>
      </View>

      {/* Loan Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View>
            <Text style={styles.detailLabel}>Interest</Text>
            <Text style={styles.detailAmount}>NGN {calculateInterest().toLocaleString()} (5%)</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailRow}>
          <View>
            <Text style={styles.detailLabel}>Total due</Text>
            <Text style={styles.totalAmount}>NGN {calculateTotal().toLocaleString()}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity 
        style={[styles.continueButton, loanAmount === 0 && styles.disabledButton]}
        disabled={loanAmount === 0}
        onPress={() => navigation.navigate('LoanSubmit', {
          loanAmount: loanAmount,
          loanTerm: loanTerm,
          interest: calculateInterest(),
          totalDue: calculateTotal()
        })}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sliderContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sliderLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  selectedAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedDays: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  rangeText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 20,
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
  },
  detailAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  totalAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewDetails: {
    color: 'white',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  continueButton: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  continueButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 