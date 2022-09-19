import { View, Text } from 'react-native'
import React, { useEffect, useEffect } from 'react'
import * as location from 'expo-location'

const openWeatherKey = '73f329c980a69d4fc27f66cfde5f018d'
let uri = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadforecast = async () => {
        setRefreshing(true);
        //ask for permission to access location
        const { status } = await location.requestPermissionsAsync();
        if (status !== 'granted') {
            setRefreshing(false);
            return;
        }
    }
        

  return (
    <View>
      <Text>Weather</Text>
    </View>
  )
}

export default Weather