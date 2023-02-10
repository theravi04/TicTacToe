import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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

const copyArray = (original) => {
  const copy = original.map((arr) => {
    return arr.slice();
  });

  return copy;
};

export default function App() {
  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState("x");

  const [gameMode, setGameMode] = useState("BOT_MEDIUM"); //local easy medium

  useEffect(() => {
    if (currentTurn == "o" && gameMode != "LOCAL") {
      botTurn();
    }
  }, [currentTurn, gameMode]);

  useEffect(() => {
    const winner = getWinner(map);
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  }, [map]);

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
  };

  const getWinner = (winnerMap) => {
    //check rows
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = winnerMap[i].every((cell) => cell == "x");
      const isRowOWinning = winnerMap[i].every((cell) => cell == "o");
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
        if (winnerMap[row][col] != "x") {
          isColumnXWinning = false;
        }
        if (winnerMap[row][col] != "o") {
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
      if (winnerMap[i][i] != "o") {
        isDiagonalO1Winning = false;
      }
      if (winnerMap[i][i] != "x") {
        isDiagonalX1Winning = false;
      }

      if (winnerMap[i][2 - i] != "o") {
        isDiagonalO2Winning = false;
      }
      if (winnerMap[i][2 - i] != "x") {
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

  const botTurn = () => {
    //collect all possible options
    const possiblePositions = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell == "") {
          possiblePositions.push({ row: rowIndex, col: columnIndex });
        }
      });
    });

    let chosenOption;

    if (gameMode == "BOT_MEDIUM") {
      //attack
      possiblePositions.forEach((possiblePositions) => {
        const mapCopy = copyArray(map);
        mapCopy[possiblePositions.row][possiblePositions.column] = "o";

        const winner = getWinner(mapCopy);
        if (winner == "o") {
          //attack that position
          chosenOption = possiblePositions;
        }
      });

      if (!chosenOption) {
        //defend
        possiblePositions.forEach((possiblePositions) => {
          const mapCopy = copyArray(map);

          mapCopy[possiblePositions.row][possiblePositions.column] = "x";

          const winner = getWinner(mapCopy);
          if (winner == "x") {
            //defend that position
            chosenOption = possiblePositions;
          }
        });
      }
    }

    //choose the best option
    if (!chosenOption) {
      chosenOption =
        possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    }

    if (chosenOption) {
      onPress(chosenOption.row, chosenOption.col);
    }
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
                  onPress={() => onPress(rowIndex, columnIndex)}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.buttons}>
          <Text
            onPress={() => setGameMode("LOCAL")}
            style={[
              styles.button,
              { backgroundColor: gameMode == "LOCAL" ? "#4F5686" : "#191F24" },
            ]}
          >
            Local
          </Text>
          <Text
            onPress={() => setGameMode("BOT_EASY")}
            style={[
              styles.button,
              {
                backgroundColor: gameMode == "BOT_EASY" ? "#4F5686" : "#191F24",
              },
            ]}
          >
            Easy Bot
          </Text>
          <Text
            onPress={() => setGameMode("BOT_MEDIUM")}
            style={[
              styles.button,
              {
                backgroundColor:
                  gameMode == "BOT_MEDIUM" ? "#4F5686" : "#191F24",
              },
            ]}
          >
            Medium Bot
          </Text>
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
  buttons: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },
  button: {
    color: "white",
    margin: 10,
    fontSize: 20,
    backgroundColor: "#191F24",
    padding: 10,
    paddingHorizontal: 15,
  },
});
