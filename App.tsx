import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreens from './src/screens/HomeScreens';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{headerShown: false, headerTintColor: '#181A1C'}}
            name="Home"
            component={HomeScreens}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
