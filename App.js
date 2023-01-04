import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import bg from "./assets/bg.jpeg";

export default function App() {

  const [map, setMap] = useState([

    ['o','',''],  //1st Row
    ['','x','x'],  //2st Row
    ['o','',''],  //3st Row

  ]);


  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>

          {map.map(row => {
            row.map(cell =>(
              <View style={styles.cell}></View>
            ))
          })}

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
  map:{
    borderWidth:1,
    borderColor:'white',
    width:'80%',
    aspectRatio:1,
  },
  cell:{
    
  },
  circle: {
    position:'absolute',

    left: 1 * 110,
    top:2 * 110,

    width: 75,
    height: 75,
    borderColor: "white",
    borderRadius: 50,
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  cross:{

    // left: 0 * 119,
    // top: 0 * 117,

    width: 75,
    height: 75,
    position:'absolute',
  },
  crossLine: {
    position: "absolute",
    left:32.5,
    width: 10,
    height: 70,
    backgroundColor: "white",
    borderRadius:5,
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
