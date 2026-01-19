import * as Location from 'expo-location';

export async function getCurrentCountry() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (reverseGeocode.length > 0) {
      return reverseGeocode[0].isoCountryCode; // e.g., 'TR', 'US'
    }
    return null;
  } catch (error) {
    console.error('Error getting current country:', error);
    return null;
  }
}
