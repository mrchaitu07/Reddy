import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ApplyLoanScreen({ navigation }) {
  const [selectedLoan, setSelectedLoan] = useState(null);
  
  const loanPackages = [
    {
      id: 1,
      title: "Starter Loan",
      amount: "₦5,000",
      duration: "2-4 weeks",
      description: "Perfect for first-time borrowers. Build credit and unlock higher loans.",
      color: "#F8D0D9"
    },
    {
      id: 2,
      title: "Growth Loan",
      amount: "₦15,000",
      duration: "4-8 weeks",
      description: "For returning customers with good repayment history.",
      color: "#BFE0CD"
    },
    {
      id: 3,
      title: "Business Loan",
      amount: "₦50,000",
      duration: "8-12 weeks",
      description: "Larger amounts for established customers with excellent history.",
      color: "#B5C9DC"
    }
  ];

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
        <Text style={styles.headerTitle}>Choose Loan Package</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Icon name="information" size={24} color="#6C63FF" />
          </View>
          <Text style={styles.infoText}>
            Select a loan package that suits your needs. Start with smaller loans to build trust and unlock larger amounts.
          </Text>
        </View>

        {/* Loan Packages */}
        {loanPackages.map((loan, index) => (
          <TouchableOpacity
            key={loan.id}
            style={[
              styles.loanCard,
              selectedLoan === loan.id && styles.selectedLoanCard
            ]}
            onPress={() => setSelectedLoan(loan.id)}
          >
            <View style={[styles.loanHeader, { backgroundColor: loan.color }]}>
              <Text style={styles.loanTitle}>{loan.title}</Text>
              <View style={styles.amountBadge}>
                <Text style={styles.amountText}>{loan.amount}</Text>
              </View>
            </View>
            
            <View style={styles.loanContent}>
              <View style={styles.durationContainer}>
                <Icon name="clock-outline" size={20} color="#666" />
                <Text style={styles.durationText}>{loan.duration}</Text>
              </View>
              
              <Text style={styles.loanDescription}>
                {loan.description}
              </Text>
              
              <View style={styles.selectContainer}>
                <View style={[
                  styles.radioButton,
                  selectedLoan === loan.id && styles.radioButtonSelected
                ]}>
                  {selectedLoan === loan.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.selectText}>Select Package</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedLoan && styles.disabledButton
          ]}
          disabled={!selectedLoan}
          onPress={() => navigation.navigate('LoanRequest')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoCard: {
    backgroundColor: "#EDF0FF",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
  loanCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedLoanCard: {
    borderWidth: 2,
    borderColor: "#6C63FF",
  },
  loanHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  loanTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  amountBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  amountText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  loanContent: {
    padding: 15,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  durationText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  loanDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 15,
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6C63FF",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#6C63FF",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6C63FF",
  },
  selectText: {
    fontSize: 14,
    color: "#6C63FF",
    fontWeight: "500",
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  continueButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
}); 