import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import Market from './src/screens/MarketScreen';
import RegisterScreen from './src/screens/RegisterScreen';
<<<<<<< HEAD
import MonitorScreen from './src/screens/MonitorScreen';

const navigator = createStackNavigator(
  {
    Home: IndexScreen,
    Register: RegisterScreen,
    Monitor: MonitorScreen,
=======
const navigator = createStackNavigator(
  {
    Home: IndexScreen,
    Market: Market,
    Register: RegisterScreen
>>>>>>> 4e7676389b62ec8ba1eec78287aed4587038b22a
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      // header: false
    },
  }
);

export default createAppContainer(navigator);
