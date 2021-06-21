import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUp } from './Screens';
import Tabs from './Navigation/Tabs';

const Stack = createStackNavigator();

const theam = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		border: 'transparent'
	}
};

export default function App() {
	return (
		<NavigationContainer theam={theam}>
			<SafeAreaProvider>
				<Stack.Navigator
					screenOptions={{
						headerShown: false
					}}
					initialRouteName={'SignUp'}
				>
					<Stack.Screen name="SignUp" component={SignUp} />

					{/* ========= TABS =========== */}
					<Stack.Screen name="Home" component={Tabs} />

				</Stack.Navigator>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
