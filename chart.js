import React, { FC } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import Svg from "react-native-svg";

const Chart = (props) => {
  const arr = [...props.values];

  const newArr = [];

  for (const key in arr) {
    if (key % 25 === 0) {
      newArr.push({
        date: new Date(arr[key][0]).toDateString(),
        price: arr[key][1],
      });
    }
  }

  const chartHeight = Dimensions.get("window").height * 0.7;
  return (
    <SafeAreaView>
      <VictoryChart
        height={chartHeight}
        domainPadding={60}
        width={500}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          label="Date"
          axisLabelComponent={<VictoryLabel dy={30} />}
          fixLabelOverlap={true}
          style={{ axisLabel: { padding: 0, fontSize: 20 } }}
        />

        <VictoryAxis
          dependentAxis
          fixLabelOverlap={true}
          label="Price ($)"
          axisLabelComponent={<VictoryLabel dy={-10} dx={-175} />}
          style={{ axisLabel: { padding: 0, fontSize: 20 } }}
        />

        <VictoryBar
          data={newArr}
          x="date"
          y="price"
          barRatio={0.2}
          labels={({ datum }) => `${datum._y.toFixed(0)}`}
        />
      </VictoryChart>
    </SafeAreaView>
  );
};

export default Chart;
