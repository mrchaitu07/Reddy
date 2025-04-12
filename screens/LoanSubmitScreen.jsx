import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from 'react-native-dropdown-picker';

export default function LoanSubmitScreen({ navigation, route }) {
  // Get loan details passed from previous screen
  const { loanAmount, loanTerm, interest, totalDue } = route.params;
  
  const [purpose, setPurpose] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  // Dropdown state
  const [open, setOpen] = useState(false);
  const [bankValue, setBankValue] = useState(null);
  const [banks] = useState([
    { label: 'United Bank for Africa', value: 'uba' },
    { label: 'Access Bank', value: 'access' },
    { label: 'First Bank', value: 'firstbank' },
    { label: 'Zenith Bank', value: 'zenith' }
  ]);

  const handleSubmit = () => {
    // Handle loan submission
    if (purpose && bankValue && accountNumber) {
      // Navigate to success screen or handle submission
      navigation.navigate('LoanSuccess');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Loan request</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Repayment will be automatically collected from the debit card linked to your account
        </Text>

        {/* Loan Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Loan Amount</Text>
              <Text style={styles.summaryValue}>NGN {loanAmount.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>{loanTerm} days</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Interest</Text>
              <Text style={styles.summaryValue}>NGN {interest.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Total Due</Text>
              <Text style={styles.summaryValue}>NGN {totalDue.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Purpose Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Purpose of loan</Text>
          <TextInput
            style={styles.input}
            placeholder="Education"
            value={purpose}
            onChangeText={setPurpose}
          />
        </View>

        {/* Bank Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bank Account information</Text>
          <DropDownPicker
            open={open}
            value={bankValue}
            items={banks}
            setOpen={setOpen}
            setValue={setBankValue}
            style={styles.dropDown}
            dropDownContainerStyle={styles.dropDownContainer}
            placeholder="Select your bank"
          />
        </View>

        {/* Account Number Input */}
        {bankValue && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Account Number"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        )}
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[
          styles.submitButton,
          (!purpose || !bankValue || !accountNumber) && styles.disabledButton
        ]}
        disabled={!purpose || !bankValue || !accountNumber}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: '#6C63FF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryCol: {
    flex: 1,
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  dropDown: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dropDownContainer: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 