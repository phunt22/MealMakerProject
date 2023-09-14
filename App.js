import "react-native-url-polyfill/auto"
import { StyleSheet } from 'react-native';

// react navigation imports
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/Tabs.js';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}