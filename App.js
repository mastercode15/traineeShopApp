import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import Market from './src/screens/MarketScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Producto from './src/screens/CarritoScreen';

const navigator = createStackNavigator(
  {
    Home: IndexScreen,
    Market: Market,
    Register: RegisterScreen,
    CarritoScreen: Producto,

  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      //header: false
    },
  }
);

export default createAppContainer(navigator);
