import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default Timer = ({ time }) =>{

    const formattedTime = `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`

    return(
        <View style={styles.container}>
            <Text style={styles.time}>{formattedTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
    flex: .9,
    justifyContent: "center",
    padding: 15,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#9794F2',
   },
   time: {
    color: "#4E5359",
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
   }
})