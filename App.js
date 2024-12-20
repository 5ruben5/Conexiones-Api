import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { GameProvider } from './src/context/GameContext'; // Importa el proveedor de contexto
import Screen1 from './src/screens/Screen1';
import Screen2 from './src/screens/Screen2';

const Tab = createBottomTabNavigator();

const App = () => (
  <GameProvider> {/* Envuelve la aplicación en el proveedor */}
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ejercicio 1" component={Screen1} />
        <Tab.Screen name="Ejercicio 2" component={Screen2} />
      </Tab.Navigator>
    </NavigationContainer>
  </GameProvider>
);

export default App;
