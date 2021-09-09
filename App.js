import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MonitorScreen from './src/screens/MonitorScreen';

const navigator = createStackNavigator(
  {
    Home: IndexScreen,
    Register: RegisterScreen,
    Monitor: MonitorScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      // header: false
    },
  }
);

export default createAppContainer(navigator);
