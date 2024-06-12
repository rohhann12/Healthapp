import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BmiCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  const handleCalculate = async () => {
    const token = await AsyncStorage.getItem('userToken'); 
    console.log('Token:', token); // Log the token to check if it is null
    if (!token) {
      Alert.alert('Error', 'User token not found');
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:3000/functionality/bmiCal', { // Update the URL to the correct endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      const { msg, bmi } = data;
      setBmiResult(bmi);
      Alert.alert('BMI Calculation', msg);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error calculating BMI');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Weight (kg):</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="Enter weight in kg"
      />
      <Text style={styles.label}>Height (m):</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        placeholder="Enter height in m"
      />
      <Button title="Calculate BMI" onPress={handleCalculate} />
      {bmiResult && <Text style={styles.result}>Your BMI: {bmiResult}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '80%',
  },
  result: {
    marginTop: 16,
    fontSize: 18,
  },
});

export default BmiCalculator;