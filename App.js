import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import bg from "./assets/bg.jpeg";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.circle} />

        <View>
          <View style={styles.crossLine}/>
          <View style={[styles.crossLine,styles.crossLineR]}/>
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
  circle: {
    width: 75,
    height: 75,
    borderColor: "white",
    borderRadius: 50,
    borderWidth:10,
    alignItems: "center",
    justifyContent: "center",
    margin:10,

  },
  crossLine:{
    position:'absolute',
    width:11,
    height:95,
    backgroundColor:'white',
    transform:[
      {
        rotate: '45deg'
      }
    ]
  },
  crossLineR:{
    transform:[
      {
        rotate: '-45deg'
      }
    ]
  }
});
