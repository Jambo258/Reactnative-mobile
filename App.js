import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "./Homepage";
import Secondpage from "./Secondpage";

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{
            title: "Bitcoin value fetch application",
            headerStyle: {
              backgroundColor: "pink",
            },
          }}
        />
        <Stack.Screen
          name="Secondpage"
          component={Secondpage}
          options={{
            title: "Bitcoin value in chart",
            headerStyle: {
              backgroundColor: "pink",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
