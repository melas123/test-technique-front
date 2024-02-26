import { StyleSheet, Platform } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Characters from './components/characters/Characters.components';
import Locations from './components/locations/Locations.components';
import Episodes from './components/episodes/Episodes.components';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
  },
});

export default function App() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <>
        {Platform.OS === 'web' ? (
          <style type="text/css">{`
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
        }
      `}</style>
        ) : null}
        <NavigationContainer>
          <Tab.Navigator style={styles.container}>
            <Tab.Screen name="Characters" component={Characters} />
            <Tab.Screen name="Locations" component={Locations} />
            <Tab.Screen name="Episodes" component={Episodes} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    </PaperProvider>
  );
}
