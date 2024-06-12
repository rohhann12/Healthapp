import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions } from "react-native";
import { accelerometer } from "react-native-sensors";
import CircularProgress from "react-native-circular-progress-indicator";

const App: React.FC = () => {
  const [pedometerAvailability, setPedometerAvailability] = useState(true);
  const [stepCount, setStepCount] = useState(0);

  const windowHeight = Dimensions.get("window").height;
  const distanceCovered: number = parseFloat((stepCount / 1300).toFixed(4));
  
  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      const totalAcceleration = Math.sqrt(x * x + y * y + z * z);
      if (totalAcceleration > 1.2) {
        setStepCount((prevStepCount) => prevStepCount + 1);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../images/stepcountedr.jpg")}
        resizeMode="cover"
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headingDesign}>
            Is Pedometer available on the device: {String(pedometerAvailability)}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
          <CircularProgress
            value={stepCount}
            maxValue={6500}
            radius={210}
            activeStrokeColor={"#f39c12"}
            inActiveStrokeColor={"#9b59b6"}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={40}
            activeStrokeWidth={40}
            title={"Step Count"}
            titleColor={"#ecf0f1"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.textDesign, { paddingLeft: 20, marginLeft: '23%' }]}>
              Target: 10000 steps 
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[styles.textDesign, { width: "93%", paddingLeft: 20, marginLeft: '-3.5%' }]}>
              Distance Covered: {distanceCovered} km
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headingDesign: {
    backgroundColor: "rgba(155, 89, 182,0.5)",
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Papyrus",
  },
  textDesign: {
    backgroundColor: "rgba(155, 89, 182,0.5)",
    height: 50,
    width: '85%',
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Papyrus",
  },
});

export default App;
