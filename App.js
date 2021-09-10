import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import Market from './src/screens/MarketScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';

const navigator = createStackNavigator({
    Home: IndexScreen,
    Market: Market,
    Register: RegisterScreen,
    Login: LoginScreen

},

  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        //header: false
    },
});

export default createAppContainer(navigator);