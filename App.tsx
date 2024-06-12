import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './component/Initial/Login';
import HomeScreen from './component/screens/Home';
import SignUpScreen from './component/Initial/signUp';
import BmiScreen from './component/screens/BmiHome';
import StepsCounterScreen from './component/screens/StepsCounterHome';
import NewBmiScreen from './component/screens/NewBmi';
import NewStepsCounterScreen from './component/screens/NewStepsCounter';
import PastBmiScreen from './component/screens/PastBmi';
import PastStepCounterScreen from './component/screens/PastSteps';
import  './Localization/i18n';
const STORE_LANGUAGE_KEY = "settings.lang";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  BmiHome: undefined;
  StepsCounterHome: undefined;
  NewBmi: undefined;
  NewStepsCounter: undefined;
  PastBmi: undefined;
  PastSteps: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        <Stack.Screen name="BmiHome" component={BmiScreen} />
        <Stack.Screen name="StepsCounterHome" component={StepsCounterScreen} />

        <Stack.Screen name="NewBmi" component={NewBmiScreen} />
        <Stack.Screen name="PastBmi" component={PastBmiScreen} />
        
        <Stack.Screen name="PastSteps" component={PastStepCounterScreen} />      
        <Stack.Screen name="NewStepsCounter" component={NewStepsCounterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



