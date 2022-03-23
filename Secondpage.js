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
  ScrollView,
} from "react-native";
import Chart from "./chart";

const Secondpage = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView horizontal style={{ backgroundColor: "powderblue" }}>
          <Chart values={route.params.values} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "lightgrey",
  },
});
export default Secondpage;
