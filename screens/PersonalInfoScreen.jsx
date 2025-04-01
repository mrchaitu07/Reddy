import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PersonalInfoScreen({ navigation }) {
  const [name, setName] = useState("Cameron S.");
  const [email, setEmail] = useState("Sample@gmail.com");
  const [dob, setDob] = useState("04/23/1991");
  const [city, setCity] = useState("Jakarta");
  const [ssn, setSsn] = useState("000 - 00 - 0001");

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SetupAccount")}>
        <Icon name="arrow-left" size={24} color="#6D28D9" />
      </TouchableOpacity>

      <Text style={styles.header}>Personal Information</Text>
      <Text style={styles.subText}>
        Please fill in the information below. Your security number is required by federal law to open a bank account.
      </Text>

      {/* Input Fields */}
      <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} mode="outlined" />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon name="email" />}
      />

      <TextInput
        label="Date of Birth"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon name="calendar" />}
      />

      <TextInput
        label="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon name="map-marker" />}
      />

      <TextInput label="SSN" value={ssn} onChangeText={setSsn} style={styles.input} mode="outlined" />

      {/* Terms and Privacy */}
      <Text style={styles.termsText}>
        Please read our <Text style={styles.linkText}>Terms & Conditions</Text> and{" "}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>

      {/* Save Button */}
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("SetupAccount")}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8FC",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6D28D9",
    marginTop: 40,
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginVertical: 10,
  },
  input: {
    marginBottom: 12,
  },
  termsText: {
    textAlign: "center",
    color: "#555",
    marginVertical: 10,
  },
  linkText: {
    color: "#6D28D9",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6D28D9",
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
  },
});
