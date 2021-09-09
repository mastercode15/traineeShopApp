import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import PayPage from './src/screens/PayScreen';

const navigator = createStackNavigator(
  {
    Home: IndexScreen,
    Pagos: PayPage

  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      // header: false
    },
  }
);

export default createAppContainer(navigator);
