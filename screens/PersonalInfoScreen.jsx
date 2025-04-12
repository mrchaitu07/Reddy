import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { TextInput, Button, Menu, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PersonalInfoScreen({ navigation }) {
  // State for tab navigation and form data
  const [currentTab, setCurrentTab] = useState(1); // 1: Basic, 2: Personal, 3: Contact
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderMenu, setShowGenderMenu] = useState(false);
  const [showEducationMenu, setShowEducationMenu] = useState(false);
  const [showJobMenu, setShowJobMenu] = useState(false);
  const [showProfessionMenu, setShowProfessionMenu] = useState(false);
  const [showSalaryMenu, setShowSalaryMenu] = useState(false);
  const [showMaritalMenu, setShowMaritalMenu] = useState(false);
  const [showRelationship1Menu, setShowRelationship1Menu] = useState(false);
  const [showRelationship2Menu, setShowRelationship2Menu] = useState(false);

  // Form data - Basic
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [displayDob, setDisplayDob] = useState("dd/mm/yy");
  const [gender, setGender] = useState("");

  // Form data - Personal
  const [education, setEducation] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [profession, setProfession] = useState("");
  const [salary, setSalary] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  // Form data - Contact
  const [relationship1, setRelationship1] = useState("");
  const [contact1Name, setContact1Name] = useState("");
  const [relationship2, setRelationship2] = useState("");
  const [contact2Name, setContact2Name] = useState("");

  // Options
  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const educationOptions = ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate"];
  const jobOptions = ["Employed", "Self-employed", "Unemployed", "Student", "Retired"];
  const professionOptions = ["Engineering", "Healthcare", "Finance", "Education", "IT", "Other"];
  const salaryOptions = ["Below $30,000", "$30,000-$50,000", "$50,000-$80,000", "$80,000-$120,000", "Above $120,000"];
  const maritalOptions = ["Single", "Married", "Divorced", "Widowed"];
  const relationshipOptions = ["Parent", "Sibling", "Spouse", "Friend", "Relative"];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
      setDisplayDob(`${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear().toString().slice(-2)}`);
    }
  };

  const navigateToNextTab = () => {
    if (currentTab === 1) {
      // Validate basic info
      if (!firstName || !lastName || displayDob === "dd/mm/yy" || !gender) {
        alert("Please fill all required fields");
        return;
      }
      setCurrentTab(2);
    } else if (currentTab === 2) {
      // Validate personal info
      if (!education || !jobStatus || !profession || !salary || !maritalStatus) {
        alert("Please fill all required fields");
        return;
      }
      setCurrentTab(3);
    } else if (currentTab === 3) {
      // Validate contact info and submit
      if (!relationship1 || !contact1Name) {
        alert("Please fill at least Contact 1 details");
        return;
      }
      
      // Show success and navigate back
      navigation.navigate("SuccessScreen", { 
        message: "Personal Information Submitted Successfully!",
        description: "Your information has been saved.",
        destination: "SetupAccount",
        params: { personalInfoCompleted: true }
      });
    }
  };

  const renderBasicInfoTab = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.inputLabel}>First name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Please enter first name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          mode="outlined"
          outlineColor="#ddd"
          activeOutlineColor="#6C63FF"
        />
      </View>

      <Text style={styles.inputLabel}>Middle name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Please enter middle name"
          value={middleName}
          onChangeText={setMiddleName}
          style={styles.input}
          mode="outlined"
          outlineColor="#ddd"
          activeOutlineColor="#6C63FF"
        />
      </View>

      <Text style={styles.inputLabel}>Last name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Please enter last name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          mode="outlined"
          outlineColor="#ddd"
          activeOutlineColor="#6C63FF"
        />
      </View>

      <Text style={styles.inputLabel}>Date of birth</Text>
      <TouchableOpacity 
        style={styles.inputContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <View style={styles.selectInput}>
          <Text style={styles.selectText}>
            {displayDob}
          </Text>
          <Icon name="chevron-down" size={20} color="#777" />
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.inputLabel}>Gender</Text>
      <Menu
        visible={showGenderMenu}
        onDismiss={() => setShowGenderMenu(false)}
        anchor={
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowGenderMenu(true)}
          >
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>
                {gender || "Please select your gender"}
              </Text>
              <Icon name="chevron-down" size={20} color="#777" />
            </View>
          </TouchableOpacity>
        }
      >
        {genderOptions.map((option) => (
          <Menu.Item 
            key={option} 
            onPress={() => {
              setGender(option);
              setShowGenderMenu(false);
            }} 
            title={option} 
          />
        ))}
      </Menu>

      <TouchableOpacity style={styles.nextButton} onPress={navigateToNextTab}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderPersonalInfoTab = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.inputLabel}>Education</Text>
      <Menu
        visible={showEducationMenu}
        onDismiss={() => setShowEducationMenu(false)}
        anchor={
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowEducationMenu(true)}
          >
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>
                {education || "Please select your highest degree"}
              </Text>
              <Icon name="chevron-down" size={20} color="#777" />
            </View>
          </TouchableOpacity>
        }
      >
        {educationOptions.map((option) => (
          <Menu.Item 
            key={option} 
            onPress={() => {
              setEducation(option);
              setShowEducationMenu(false);
            }} 
            title={option} 
          />
        ))}
      </Menu>

      <Text style={styles.inputLabel}>Job status</Text>
      <Menu
        visible={showJobMenu}
        onDismiss={() => setShowJobMenu(false)}
        anchor={
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowJobMenu(true)}
          >
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>
                {jobStatus || "Please select your job status"}
              </Text>
              <Icon name="chevron-down" size={20} color="#777" />
            </View>
          </TouchableOpacity>
        }
      >
        {jobOptions.map((option) => (
          <Menu.Item 
            key={option} 
            onPress={() => {
              setJobStatus(option);
              setShowJobMenu(false);
            }} 
            title={option} 
          />
        ))}
      </Menu>

      <Text style={styles.inputLabel}>Profession</Text>
      <Menu
        visible={showProfessionMenu}
        onDismiss={() => setShowProfessionMenu(false)}
        anchor={
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowProfessionMenu(true)}
          >
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>
                {profession || "Please select your profession"}
              </Text>
              <Icon name="chevron-down" size={20} color="#777" />
            </View>
          </TouchableOpacity>
        }
      >
        {professionOptions.map((option) => (
          <Menu.Item 
            key={option} 
            onPress={() => {
              setProfession(option);
              setShowProfessionMenu(false);
            }} 
            title={option} 
          />
        ))}
      </Menu>

      <Text style={styles.inputLabel}>Salary</Text>
      <Menu
        visible={showSalaryMenu}
        onDismiss={() => setShowSalaryMenu(false)}
        anchor={
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowSalaryMenu(true)}
          >
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>
                {salary || "Please select your salary range"}
              </Text>
              <Icon name="chevron-down" size={20} color="#777" />
            </View>
          </TouchableOpacity>
        }
      >
        {salaryOptions.map((option) => (
          <Menu.Item 
            key={option} 
            onPress={() => {
              setSalary(option);
              setShowSalaryMenu(false);
            }} 
            title={option} 
          />
        ))}
      </Menu>

      <Text style={styles.inputLabel}>Marital status</Text>
      <Menu
        visible={showMaritalMenu}
        onDismiss={() => setShowMaritalMenu(false)}
        anchor={
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowMaritalMenu(true)}
          >
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>
                {maritalStatus || "Please select your marital status"}
              </Text>
              <Icon name="chevron-down" size={20} color="#777" />
            </View>
          </TouchableOpacity>
        }
      >
        {maritalOptions.map((option) => (
          <Menu.Item 
            key={option} 
            onPress={() => {
              setMaritalStatus(option);
              setShowMaritalMenu(false);
            }} 
            title={option} 
          />
        ))}
      </Menu>

      <TouchableOpacity style={styles.nextButton} onPress={navigateToNextTab}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderContactInfoTab = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Contact 1</Text>
      <Text style={styles.inputLabel}>Relationship</Text>
      <Menu
        visible={showRelationship1Menu}
        onDismiss={() => setShowRelationship1Menu(false)}
        anchor={
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowRelationship1Menu(true)}
          >
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>
                {relationship1 || "Please select the relationship with you"}
              </Text>
              <Icon name="chevron-down" size={20} color="#777" />
            </View>
          </TouchableOpacity>
        }
      >
        {relationshipOptions.map((option) => (
          <Menu.Item 
            key={option} 
            onPress={() => {
              setRelationship1(option);
              setShowRelationship1Menu(false);
            }} 
            title={option} 
          />
        ))}
      </Menu>

      <TouchableOpacity 
        style={styles.contactNameInput}
        onPress={() => {
          // Show name input dialog
          setContact1Name("John Doe"); // For demo
        }}
      >
        <Text style={[styles.contactNameText, contact1Name ? styles.filledText : {}]}>
          {contact1Name || "Click + for name"}
        </Text>
        <Icon name="plus" size={20} color="#6C63FF" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Contact 2</Text>
      <Text style={styles.inputLabel}>Relationship</Text>
      <Menu
        visible={showRelationship2Menu}
        onDismiss={() => setShowRelationship2Menu(false)}
        anchor={
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowRelationship2Menu(true)}
          >
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>
                {relationship2 || "Please select the relationship with you"}
              </Text>
              <Icon name="chevron-down" size={20} color="#777" />
            </View>
          </TouchableOpacity>
        }
      >
        {relationshipOptions.map((option) => (
          <Menu.Item 
            key={option} 
            onPress={() => {
              setRelationship2(option);
              setShowRelationship2Menu(false);
            }} 
            title={option} 
          />
        ))}
      </Menu>

      <TouchableOpacity 
        style={styles.contactNameInput}
        onPress={() => {
          // Show name input dialog
          setContact2Name("Jane Smith"); // For demo
        }}
      >
        <Text style={[styles.contactNameText, contact2Name ? styles.filledText : {}]}>
          {contact2Name || "Click + for name"}
        </Text>
        <Icon name="plus" size={20} color="#6C63FF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={navigateToNextTab}>
        <Text style={styles.nextButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderActiveTab = () => {
    if (currentTab === 1) return renderBasicInfoTab();
    if (currentTab === 2) return renderPersonalInfoTab();
    if (currentTab === 3) return renderContactInfoTab();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SetupAccount")}>
        <Icon name="arrow-left" size={24} color="#6D28D9" />
      </TouchableOpacity>

      <Text style={styles.header}>Personal Information</Text>
      <Text style={styles.subHeader}>Please fill in the following information</Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, currentTab === 1 && styles.activeTabButton]}
          onPress={() => setCurrentTab(1)}
        >
          <View style={[styles.tabCircle, currentTab === 1 && styles.activeTabCircle]}>
            <Text style={[styles.tabNumber, currentTab === 1 && styles.activeTabNumber]}>1</Text>
          </View>
          <Text style={[styles.tabText, currentTab === 1 && styles.activeTabText]}>Basic</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, currentTab === 2 && styles.activeTabButton]}
          onPress={() => setCurrentTab(2)}
        >
          <View style={[styles.tabCircle, currentTab === 2 && styles.activeTabCircle]}>
            <Text style={[styles.tabNumber, currentTab === 2 && styles.activeTabNumber]}>2</Text>
          </View>
          <Text style={[styles.tabText, currentTab === 2 && styles.activeTabText]}>Personal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, currentTab === 3 && styles.activeTabButton]}
          onPress={() => setCurrentTab(3)}
        >
          <View style={[styles.tabCircle, currentTab === 3 && styles.activeTabCircle]}>
            <Text style={[styles.tabNumber, currentTab === 3 && styles.activeTabNumber]}>3</Text>
          </View>
          <Text style={[styles.tabText, currentTab === 3 && styles.activeTabText]}>Contact</Text>
        </TouchableOpacity>
    </View>

      {/* Form Content */}
      {renderActiveTab()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    padding: 10,
    marginLeft: 6,
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
  },
  subHeader: {
    fontSize: 14,
    color: "#888",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  tabButton: {
    alignItems: "center",
  },
  activeTabButton: {},
  tabCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  activeTabCircle: {
    backgroundColor: "#6C63FF",
  },
  tabNumber: {
    fontSize: 16,
    color: "#6C63FF",
  },
  activeTabNumber: {
    color: "white",
  },
  tabText: {
    fontSize: 14,
    color: "#888",
  },
  activeTabText: {
    color: "#333",
    fontWeight: "bold",
  },
  formContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
  },
  selectInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    color: "#888",
  },
  nextButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  submitButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 10,
  },
  contactNameInput: {
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  contactNameText: {
    color: "#888",
  },
  filledText: {
    color: "#333",
  },
});
