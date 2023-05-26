import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreens from '../screens/HomeScreens';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreens} />
    </Tab.Navigator>
  );
}
