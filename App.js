import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';

const navigator = createStackNavigator({
    Home: IndexScreen,
    Register: RegisterScreen,
    Login: LoginScreen

}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        // header: false
    },
});

export default createAppContainer(navigator);