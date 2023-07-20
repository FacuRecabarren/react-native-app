import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

export default function App() {
  
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState('POMODORO' | 'SHORT' | 'BREAK');
  const [isActive, setIsActive] = useState(false);

  useEffect(() =>{
    let interval = null;
    if(isActive){
      interval = setInterval(() =>{
        setTime(time - 1)
      }, 1000);
    }else{
      clearInterval(interval);
    }

    if(time === 0){
      setIsActive(false);
      setIsWorking(prev => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time])

  const handleStartStop = () =>{
    if(isActive === false) playSound();
    setIsActive(!isActive);
  }

  const handlePress = () =>{
    const newTime = currentTime === 0 ? 25 : currentTime === 1 ? 5 : 15;
    setCurrentTime(currentTime);
    setTime(newTime * 60);
    if(isActive === true) setIsActive(!isActive);
}

  const playSound = async () =>{
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click2.mp3')
    )
    await sound.playAsync();
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={{
          flex: 1,
          paddingHorizontal: 15, 
          paddingTop: Platform.OS === 'android' && 30,
          }} 
        >
            <Text style={styles.text}>Pomodoro</Text>
            <Header 
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              setTime={setTime}/>
            <Timer time={time}/>
            <TouchableOpacity onPress={handleStartStop} style={styles.btn}>
              <Text style={{color: 'white', fontWeight: 'bold', width: '100%', textAlign: 'center'}}>{isActive ? 'STOP' : 'START'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={styles.btn}>
              <Text style={{ color: 'white', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>RESET</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#9794F2",
  },
  btn: { 
    backgroundColor: '#9794F2',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:  0.15,
    shadowRadius: 1.00,
    elevation: 1.2
  }
});
