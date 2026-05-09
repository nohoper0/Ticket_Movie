import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { registerRootComponent } from 'expo';

import App from './App';

// enableScreens phải được gọi TRƯỚC khi registerRootComponent
// để react-native-screens khởi tạo đúng trước khi navigator render
enableScreens();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App)
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
