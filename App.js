import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import bg from "./assets/bg.jpeg";
import Cell from "./src/cells";

const emptyMap = [
  ["", "", ""], //1st Row
  ["", "", ""], //2st Row
  ["", "", ""], //3st Row
];

export default function App() {
  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState("o");

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] != "") {
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn == "x" ? "o" : "x");

    const winner = getWinner();
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  };

  const getWinner = () => {
    //check rows
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = map[i].every((cell) => cell == "x");
      const isRowOWinning = map[i].every((cell) => cell == "o");
      if (isRowXWinning) {
        return "x";
        // break;
      }
      if (isRowOWinning) {
        return "x";
        // break;
      }
    }

    //check columns
    for (let col = 0; col < 3; col++) {
      let isColumnXWinning = true;
      let isColumnOWinning = true;

      for (let row = 0; row < 3; row++) {
        if (map[row][col] != "x") {
          isColumnXWinning = false;
        }
        if (map[row][col] != "o") {
          isColumnOWinning = false;
        }
      }

      if (isColumnXWinning) {
        return "x";
      } else if (isColumnOWinning) {
        return "o";
      }
    }

    //check diagonals
    let isDiagonalO1Winning = true;
    let isDiagonalX1Winning = true;

    let isDiagonalO2Winning = true;
    let isDiagonalX2Winning = true;

    for (let i = 0; i < 3; i++) {
      if (map[i][i] != "o") {
        isDiagonalO1Winning = false;
      }
      if (map[i][i] != "x") {
        isDiagonalX1Winning = false;
      }

      if (map[i][2 - i] != "o") {
        isDiagonalO2Winning = false;
      }
      if (map[i][2 - i] != "x") {
        isDiagonalX2Winning = false;
      }
    }

    if (isDiagonalO1Winning || isDiagonalO2Winning) return "o";

    if (isDiagonalX1Winning || isDiagonalX2Winning) return "x";
  };

  //Check Tie State
  const checkTieState = () => {
    if (!map.some((row) => row.some((cell) => cell == ""))) {
      Alert.alert(`Its a Tie`, `Tie`, [
        {
          text: "Restart",
          onPress: resetGame,
        },
      ]);
    }
  };

  //checking Game Won and Reset Game
  const gameWon = (player) => {
    Alert.alert(`Game Over!`, `Player ${player} won`, [
      {
        text: "Restart",
        onPress: resetGame,
      },
    ]);
  };

  const resetGame = () => {
    // console.warn("Reset Game");
    setMap([
      ["", "", ""], //1st Row
      ["", "", ""], //2st Row
      ["", "", ""], //3st Row
    ]);
    setCurrentTurn("x");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <Text
          style={{
            fontSize: 24,
            color: "white",
            marginTop: 50,
            marginBottom: "auto",
            position: "absolute",
            top: 50,
          }}
        >
          Current Turn : {currentTurn.toUpperCase()}
        </Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Cell
                  key={`row-${rowIndex}-col-${columnIndex}`}
                  cell={cell}
                  onPress={() => onPress(rowIndex,columnIndex)}
                />
              ))}
            </View>
          ))}
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242D34",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  map: {
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});
