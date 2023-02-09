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

const emptyMap = [
    ["", "", ""], //1st Row
    ["", "", ""], //2st Row
    ["", "", ""], //3st Row
]

export default function App() {
  const [map, setMap] = useState();

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

    checkWinningState();
  };

  const checkWinningState = () => {

    //check rows
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = map[i].every((cell) => cell == "x");
      const isRowOWinning = map[i].every((cell) => cell == "o");
      if (isRowXWinning) {
        Alert.alert('X won, Row '); //check for row number
        // break;
      }
      if (isRowOWinning) {
        Alert.alert('O won, Row '); //check for row number
        // break;
      }
    }

    //check columns
    for(let col=0; col<3; col++){

      let isColumnXWinning = true;
      let isColumnOWinning = true;

      for(let row=0; row<3; row++){
        if(map[row][col] != 'x'){
          isColumnXWinning = false;
        }
        if(map[row][col] != 'o'){
          isColumnOWinning = false;
        }
      }

      if (isColumnXWinning) {
        Alert.alert('X won. Col '); //check for column number
        break;
      }
      else if(isColumnOWinning) {
        Alert.alert('O won. Col '); //check for column number
        break;
      }
    }

    //check diagonals
    let isDiagonalO1Winning = true;
    let isDiagonalX1Winning = true;

    let isDiagonalO2Winning = true;
    let isDiagonalX2Winning = true;

    for(let i=0;i<3;i++){
      if(map[i][i] != 'o'){
        isDiagonalO1Winning = false;
      }
      if(map[i][i] != 'x'){
        isDiagonalX1Winning = false;
      }

      if(map[i][2-i] != 'o'){
        isDiagonalO2Winning = false;
      }
      if(map[i][2-i] != 'x'){
        isDiagonalX2Winning = false;
      }
    }

    if(isDiagonalO1Winning)
      Alert.alert('O won. Diagonal 1');
    
    if(isDiagonalX1Winning)
      Alert.alert('X won. Diagonal 1');

    if(isDiagonalO2Winning)
      Alert.alert('O won. Diagonal 2');
    
    if(isDiagonalX2Winning)
      Alert.alert('X won. Diagonal 2');
  };

  const gameWon = (player) =>{
    Alert.alert(``);
  }

  const resetGame = () =>{
    setMap(emptyMap);
    setCurrentTurn("x");
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={'row-${rowIndex}'} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable
                  key={'row-${rowIndex}-col-${columnIndex}'}
                  onPress={() => onPress(rowIndex, columnIndex)}
                  style={styles.cell}
                >
                  {cell == "o" && <View style={styles.circle} />}
                  {cell == "x" && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View style={[styles.crossLine, styles.crossLineR]} />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          ))}

          {/* <View style={styles.circle} />
          <View style={styles.cross}>
            <View style={styles.crossLine} />
            <View style={[styles.crossLine, styles.crossLineR]} />
          </View> */}
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
  cell: {
    width: 100,
    height: 100,
    flex: 1,
  },
  circle: {
    flex: 1,
    borderColor: "white",
    borderRadius: 50,
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  cross: {
    flex: 1,
  },
  crossLine: {
    position: "absolute",
    left: "48%",
    width: 10,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  crossLineR: {
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
});
