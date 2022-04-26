import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Config from 'react-native-config';
import useFetch from '../../hook/useFetch';
import styles from './Home.styles';
import Loading from '../../animation/Loading';
import IconFeels from 'react-native-vector-icons/dist/FontAwesome5';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import WeatherCard from '../../component/WeatherCard';

import Geolocation from '@react-native-community/geolocation';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const pullRefresh = () => {
    setRefresh(true);
    var randomLatitude = require('random-latitude');
    var randomLongitude = require('random-longitude');
    console.log(randomLatitude() + '  ' + randomLongitude());
    setLat(randomLatitude());
    setLon(randomLongitude());

    setTimeout(() => {
      setRefresh(false);
    }, 1);
  };
  let watchID = null;
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setLat(info.coords.latitude), setLon(info.coords.longitude);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
    });
    return () => {
      watchID != null && Geolocation.clearWatch(watchID);
    };
  }, []);

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const url = `${Config.API_URL}lat=${lat}&lon=${lon}&appid=${Config.API_KEY}&lang=tr`;

  const {data, error, loading} = useFetch(url);
  let date = new Date();
  var gunler = [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ];
  let gun = gunler[date.getDay()];

  if (loading) {
    return <Loading />;
  }

  if (data && data.weather) {
    const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pullRefresh()}
          />
        }>
        <StatusBar backgroundColor="#00b2cc" barStyle="light-content" />

        <ImageBackground
          style={styles.background}
          source={require('../../asset/background.jpg')}
          resizeMode="cover">
          <WeatherCard lat={lat} lon={lon} />

          <Text>{gun}</Text>

          <View style={styles.imageContainer}>
            <Text style={styles.temp}>
              {(data.main.temp / 10).toFixed(1)}&#176;C
            </Text>
            <Image source={{uri: icon}} style={styles.image} />
            <Text>{data.weather[0].description}</Text>
          </View>

          <Text>
            {(data.main.temp_min / 10).toFixed(2)}&#176;C /
            {(data.main.temp_max / 10).toFixed(2)}&#176;C
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <IconFeels name="temperature-low" size={30} color="#900" />
              <Text style={styles.detailText}>
                {(data.main.feels_like / 10).toFixed(2)}&#176;C
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Icon name="water" size={40} color="#55D8C1" />
              <Text style={styles.detailText}>{data.main.humidity} %</Text>
            </View>
            <View style={styles.infoBox}>
              <Icon name="speedometer" size={30} color="#383838" />
              <Text style={styles.detailText}>{data.main.pressure} hPa</Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
  return (
    <View>
      <Text>Veri Yok</Text>
    </View>
  );
}
