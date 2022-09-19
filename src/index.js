import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, } from 'react-native'
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
            Alert.alert('perssion to access location was denied');//if persion denies show this message
        }

        // user locations
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        //fetch weather data from the openweather api
       const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
       const data = await response.json(); //convent the response to json

       if(!response.ok){
        Alert.alert('Error', 'something went wrong'); //if the response is to corect, show this response
       }else{
        setForecast(data); //set the data to the state
       }
       setRefreshing(false);
    }
        
    // useEffect is a hook that runs after the component is rendered
    useEffect(() => {
        loadForecast();
    },[]);

    if(!forecast){ // if the response is not loaded, show loading indicator
        return(
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size='large' />
            </SafeAreaView>
        );
    }

    const current = forecast.current.weather[0]; //get the current weather

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
            refreshControl={
                <RefreshControl 
                refreshing={refreshing}
                onRefresh={() => loadForecast()}/>

            }
            style={{marginTop:50}}
        >
            <Text style={styles.title}>
                Current Weather
            </Text>
            <Text style={{alignItems:'center', textAlign:'center'}}>
                Your Location
            </Text>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Weather