import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00e5ff',
  },
  background: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
  },
  image: {height: 150, width: 150, marginBottom: -35, marginTop: -25},
  infoContainer: {flexDirection: 'row'},
  infoBox: {
    width: width * 0.25,
    height: height / 7,
    borderRadius: 8,
    marginTop: 40,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  temp: {fontSize: 40},
  detailText: {fontSize: 15, fontWeight: '600'},
});
