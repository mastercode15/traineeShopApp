import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const navigator = createStackNavigator(
  {
    Home: IndexScreen,
    Register: RegisterScreen

  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      // header: false
    },
  }
);

export default createAppContainer(navigator);
