import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default Header = ({ setTime, currentTime, setCurrentTime }) =>{

    const options = ['Pomodoro', 'Short Break', 'Long Break'];

    const handlePress = (index) =>{
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return(
        <View style={{flexDirection: "row", justifyContent: "center", gap: 8}}>
            {options.map((option, index) =>(
                <TouchableOpacity 
                    key={index} 
                    onPress={() => handlePress(index)} 
                    style={[styles.optionStyle, currentTime !== index && {borderBottomColor: 'transparent'}]}
                >
                    <Text style={{fontWeight: "bold", width: '100%', textAlign: "center", color: "#4E5359"}}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    optionStyle: {
        alignItems: 'center',
        width: '33%',
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 3,
        borderBottomColor: "#9794F2",
        marginVertical: 20,
    },
})