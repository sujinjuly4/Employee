import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EmployeDetailsScreen, EmployeeListScreen } from "./screens"

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="EmployeeListScreen" component={EmployeeListScreen} name="Employee List" />
                <Stack.Screen name="EmployeDetailsScreen" component={EmployeDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;