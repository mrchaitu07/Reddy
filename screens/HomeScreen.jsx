import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeScreen({ navigation, route }) {
  const { userName = "Joshua" } = route.params || {};
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="bell-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Main Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hello {userName},</Text>
          <Text style={styles.subText}>You have no current loan</Text>
        </View>
        
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Balance</Text>
              <View style={styles.amountContainer}>
                <View style={styles.redDot} />
                <Text style={styles.amountText}>NGN 0.00</Text>
              </View>
            </View>
            
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Monthly payment</Text>
              <View style={styles.amountContainer}>
                <View style={styles.greenDot} />
                <Text style={styles.amountText}>NGN 0.00</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.infoText}>
            Choose from our loan packages, start with the lower value loans and progressively grow.
          </Text>
          
          <TouchableOpacity>
            <Text style={styles.moreLink}>Tell me more</Text>
          </TouchableOpacity>
        </View>
        
        {/* Quick Links Section */}
        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          
          <View style={styles.quickLinksContainer}>
            <View style={styles.quickLinksGrid}>
              {/* Loan Breakdown */}
              <TouchableOpacity style={[styles.quickLinkItem, styles.pinkBg]}>
                <View style={styles.iconCircle}>
                  <Icon name="chart-pie" size={22} color="white" />
                </View>
                <Text style={styles.quickLinkText}>loan breakdown</Text>
              </TouchableOpacity>
              
              {/* Make a loan payment */}
              <TouchableOpacity style={[styles.quickLinkItem1, styles.greenBg]}>
                <View style={styles.iconCircle}>
                  <Icon name="credit-card-outline" size={22} color="white" />
                </View>
                <Text style={styles.quickLinkText}>Make a loan payment</Text>
              </TouchableOpacity>
              
              {/* Apply for a loan */}
              <TouchableOpacity 
                style={[styles.quickLinkItem2, styles.blueBg]}
                onPress={() => navigation.navigate('ApplyLoan')}
              >
                <View style={styles.iconCircle}>
                  <Icon name="hand-coin-outline" size={22} color="white" />
                </View>
                <Text style={styles.quickLinkText}>Apply for a loan</Text>
              </TouchableOpacity>
              
              {/* Add payment account */}
              <TouchableOpacity style={[styles.quickLinkItem3, styles.lightBlueBg]}>
                <View style={styles.iconCircle}>
                  <Icon name="plus" size={22} color="white" />
                </View>
                <Text style={styles.quickLinkText}>Add payment account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-variant" size={24} color="#6C63FF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="chart-bar" size={22} color="#AAAAAA" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="view-grid" size={22} color="#AAAAAA" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="account" size={24} color="#AAAAAA" />
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#6C63FF",
  },
  menuButton: {
    padding: 5,
  },
  headerRight: {
    flexDirection: "row",
  },
  notificationButton: {
    padding: 5,
  },
  welcomeSection: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height:200
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  subText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  balanceCard: {
    backgroundColor: "white",
    marginHorizontal: 35,
    marginTop: -95,
    borderRadius: 20,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width:"85%",
    height:"35%"
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  balanceItem: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 3,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5252",
    marginRight: 4,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 4,
  },
  amountText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 8,
    marginTop:25
  },
  moreLink: {
    fontSize: 13,
    color: "#6C63FF",
    fontWeight: "500",
  },
  quickLinksSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#444",
    marginBottom: 15,
  },
  quickLinksContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickLinkItem: {
    width: "49.5%",
    height: "48%",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLinkItem1: {
    width: "49.5%",
    height: "65%",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLinkItem2: {
    width: "49.5%",
    height: "65%",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:-58
  },
  quickLinkItem3: {
    width: "49.5%",
    height: "48%",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:-4

  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "visible"
  },
  pinkBg: {
    backgroundColor: "#F8D0D9",
  },
  greenBg: {
    backgroundColor: "#BFE0CD",
  },
  blueBg: {
    backgroundColor: "#B5C9DC",
  },
  lightBlueBg: {
    backgroundColor: "#D1DEFF",
  },
  quickLinkText: {
    color: "white",
    fontWeight: "500",
    fontSize: 13,
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingVertical: 12,
    backgroundColor: "white",
  },
  navItem: {
    padding: 8,
  }
}); 
