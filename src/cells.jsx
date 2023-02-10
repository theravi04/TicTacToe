import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Cross from "./cross";

const Cell = (props) => {
  const { cell, onPress } = props;
  return (
    <Pressable
      onPress={() => onPress()}
      style={styles.cell}
    >
      {cell == "o" && <View style={styles.circle} />}
      {cell == "x" && <Cross />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
    circle: {
        flex: 1,
        borderColor: "white",
        borderRadius: 50,
        borderWidth: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
      },
      cell: {
        width: 100,
        height: 100,
        flex: 1,
      },
})

export default Cell;
