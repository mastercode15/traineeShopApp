import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import RegisterPage from './src/screens/RegisterPage';
import Market from './src/screens/MarketScreen';

const navigator = createStackNavigator(
  {
    Home: IndexScreen,
    Register: RegisterPage,
    Market: Market,

  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      // header: false
    },
  }
);

export default createAppContainer(navigator);
