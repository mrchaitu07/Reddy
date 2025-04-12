import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';

const { width } = Dimensions.get('window');

// Create simple icon components using Views
const EasyAccessIcon = () => (
  <View style={styles.iconCircle}>
    <Text style={styles.iconText}>→</Text>
  </View>
);

const InterestIcon = () => (
  <View style={styles.iconCircle}>
    <Text style={styles.iconText}>%</Text>
  </View>
);

const FlexibleRepaymentIcon = () => (
  <View style={styles.iconCircle}>
    <Text style={styles.iconText}>↻</Text>
  </View>
);

const SpeedyLoanIcon = () => (
  <View style={styles.iconCircle}>
    <Text style={styles.iconText}>⚡</Text>
  </View>
);

const onboardingData = [
  {
    id: '1',
    title: 'Easy Access',
    description: 'My loan App allows you easy access to loans up to the amount of 5 Million Naira',
    icon: <EasyAccessIcon />,
    backgroundColor: '#8B5CF6',
  },
  {
    id: '2',
    title: 'Interest',
    description: 'Interest fees between the range of 2.5% to 30% which is dependent on the loan amount',
    icon: <InterestIcon />,
    backgroundColor: '#10B981',
  },
  {
    id: '3',
    title: 'Flexible Repayment',
    description: 'Repayment of fees with tenors between the period of 2 to 96 weeks.',
    icon: <FlexibleRepaymentIcon />,
    backgroundColor: '#3B82F6',
  },
  {
    id: '4',
    title: 'Speedy Loan Process',
    description: 'Very fast loan application processes with less back and forth runnings and paperwork',
    icon: <SpeedyLoanIcon />,
    backgroundColor: '#F59E0B',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {item.icon}
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
      
      {currentIndex < onboardingData.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 40,
    color: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#333',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
}); 