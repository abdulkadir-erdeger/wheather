import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './WeatherCard.styles';
import Geocoder from '@timwangdev/react-native-geocoder';

export default function WeatherCard({lat, lon}) {
  let [result, setResult] = useState(null);
  let [error, setError] = useState(null);

  const conf = {
    geocoder: {
      locale: 'tr',
      maxResults: 1,
    },
  };

  function geocodePosition() {
    setResult(null);
    setError(null);
    Geocoder.geocodePosition(
      {
        lat: lat,
        lng: lon,
      },
      conf,
    )
      .then(setResult)
      .catch(e => {
        setError(e && e.message);
        console.warn(e);
      });
  }

  useEffect(() => {
    geocodePosition();
  }, []);

  if (result && result[3]) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {result ? result[3].formattedAddress : 'Boş'}
        </Text>
      </View>
    );
  }
  return <View style={styles.container}></View>;
}
