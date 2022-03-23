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
  TextInput,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import NetInfo from "@react-native-community/netinfo";

const Display = (props) => {
  return props.values.map((item, i) => {
    return (
      <View style={styles.itemStyle} key={i}>
        <Text
          style={{
            color: "green",
          }}
        >
          Date:{" "}
          {new Date(item[0]).toLocaleString("fi-FI", {
            timeZone: "UTC",
          })}
          {"\n"}
          Price: {item[1].toFixed(1)} $
        </Text>
      </View>
    );
  });
};

const Homepage = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [values, setValues] = useState([]);

  const [date, setDate] = useState(new Date(1644400000000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [mode2, setMode2] = useState("date");
  const [show2, setShow2] = useState(false);
  const [date2, setDate2] = useState(new Date(1644400000000));
  let [timeBegin, setTimeBegin] = useState("");
  let [timeBegin2, setTimeBegin2] = useState("");
  let [timeEnd, setTimeEnd] = useState("");
  let [timeEnd2, setTimeEnd2] = useState("");
  const [isConnected, setisConnected] = useState(true);

  const CheckConnected = async () => {
    const state = await NetInfo.fetch();

    setisConnected(state.isInternetReachable);
    return state.isInternetReachable;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    var date = new Date(tempDate).getTime() / 1000 - 36000;

    setTimeBegin(fDate);
    setTimeBegin2(date);
  };

  const onChange2 = (event, selectedDate2) => {
    const currentDate = selectedDate2 || date2;
    setShow2(Platform.OS === "ios");

    setDate2(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    var date = new Date(tempDate).getTime() / 1000 + 50400;

    setTimeEnd(fDate);
    setTimeEnd2(date);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const showDatepicker2 = () => {
    showMode2("date");
  };

  const GetPrices = async () => {
    const value = await CheckConnected();

    if (value === false) {
      alert("No internet connection avaible");
    } else if (timeEnd2 <= timeBegin2 || timeBegin2 === "" || timeEnd2 === "") {
      alert("Check dates");
    } else {
      try {
        const response =
          await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_c
urrency=eur&from=${timeBegin2}&to=${timeEnd2}`);
        const json = await response.json();
        let variable = json.prices;
        setValues(variable);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    CheckConnected();
  }, [timeBegin2, timeEnd2]);

  //laita emulaattorista signal strenght moderate --> none
  //sekä data status home --> unregistered(off)
  //demotaksesi internetin puuttumista

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={showDatepicker} title="Start date" />
      </View>
      <View>
        <Button onPress={showDatepicker2} title="End date" />
      </View>
      <View>
        <Button
          title="Fetch"
          onPress={() => {
            GetPrices();
          }}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker1"
          locale="en-ES"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
      {show2 && (
        <DateTimePicker
          locale="en-ES"
          testID="dateTimePicker2"
          value={date2}
          mode={mode2}
          display="default"
          onChange={onChange2}
        />
      )}

      <Text style={{ fontSize: 16 }}>
        Chosen start date: {timeBegin} and same date on seconds {timeBegin2}
        {"\n"}Chosen end date: {timeEnd} and same date on seconds {timeEnd2}
      </Text>

      <Button
        title="Go to Second Page"
        onPress={() => navigation.navigate("Secondpage", { values: values })}
      />
      <View>
        <Text style={{ textAlign: "center", color: "red", fontSize: 20 }}>
          Connection status: {isConnected ? "Connected" : "Not connected"}
        </Text>
      </View>

      <Text style={{ textAlign: "center", color: "green", fontSize: 20 }}>
        {!isLoading ? "Bitcoin price on selected dates" : ""}
      </Text>

      <ScrollView>
        <Display values={values} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "lightgrey",
  },
  itemStyle: {
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default Homepage;
