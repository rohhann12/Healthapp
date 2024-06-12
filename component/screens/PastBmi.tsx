import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HisBmi = () => {
  const [bmiRecords, setBmiRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBmiRecords = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          setError('User token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://10.0.2.2:3000/functionality/bmiRecords', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBmiRecords(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching BMI records");
      } finally {
        setLoading(false);
      }
    };

    fetchBmiRecords();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bmiRecords}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Text>Date: {new Date(item.Time).toLocaleDateString()}</Text>
            <Text>Weight: {item.weight} kg</Text>
            <Text>Height: {item.height} cm</Text>
            <Text>BMI: {item.bmiValue}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HisBmi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  record: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
