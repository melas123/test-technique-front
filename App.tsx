import {StyleSheet, View, Text} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native';
import Characters from "./components/characters/Characters.components";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <PaperProvider theme={DefaultTheme}>
            <NavigationContainer>
               <Tab.Navigator style={styles.container}>
                    <Tab.Screen name="Characters" component={Characters} />
                    <Tab.Screen name="Locations" component={DetailsScreen} />
                   <Tab.Screen name="Episodes" component={DetailsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10
    },
});


function DetailsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
        </View>
        );
}