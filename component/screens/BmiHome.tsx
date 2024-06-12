import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 

type BmiProps = NativeStackScreenProps<RootStackParamList, 'BmiHome'>;

const HomeScreen = ({ navigation }: BmiProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('NewBmi')}
      >
        <Image
          source={require('../../images/graph.jpg')}
          style={styles.optionImage}
        />
        <View style={styles.btn}>
          <Text style={styles.btnText}>Calculate New Bmi</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => navigation.navigate('PastBmi')}
      >
        <Image
          source={require('../../images/pastSteps.jpg')}
          style={styles.optionImage}
        />
        <View style={styles.btn}>
          <Text style={styles.btnText}>Show Past Bmi Records</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  optionContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  optionImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

export default HomeScreen;
