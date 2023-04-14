import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Icons
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import HomeScreens from "../screens/HomeScreens";
import SearchScreens from "../screens/SearchScreens";
import DetailScreens from "../screens/DetailScreens";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      
    >
      <Stack.Screen name="Inicio" component={HomeScreens} />
      <Stack.Screen name="Detail" component={DetailScreens} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function NavigationTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "purple",
      }}
    >
      <Tab.Screen
        name="Home"
        component={MyStack}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreens}
        options={{
          title: "Bucador",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="movie-search"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <NavigationTab />
    </NavigationContainer>
  );
}
