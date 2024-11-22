import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation'; // For current location
import * as Location from 'expo-location'; // For location if using Expo
import Geocoder from 'react-native-geocoding';
import axios from 'axios'; // For Google Maps Directions API

// Set your Google Maps API key here
Geocoder.init("YOUR_GOOGLE_MAPS_API_KEY");

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState({ latitude: -23.550520, longitude: -46.633308 }); // Default to São Paulo
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Get user's current location
  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status === 'granted') {
        Location.getCurrentPositionAsync({}).then((location) => {
          setLocation(location.coords);
          setOrigin(location.coords);
        });
      }
    });
  }, []);

  // Function to search a location and set it as destination
  const handleSearchLocation = (address) => {
    Geocoder.from(address)
      .then(json => {
        const location = json.results[0].geometry.location;
        setDestination(address);
        setRouteCoordinates([]); // Clear previous route
        setOrigin({ latitude: location.lat, longitude: location.lng });
      })
      .catch(error => console.warn(error));
  };

  // Function to fetch directions from origin to destination
  const fetchRoute = () => {
    if (!destination || !origin) return;

    const originStr = `${origin.latitude},${origin.longitude}`;
    Geocoder.from(destination).then(json => {
      const destinationLocation = json.results[0].geometry.location;
      const destinationStr = `${destinationLocation.lat},${destinationLocation.lng}`;

      const directionUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=YOUR_GOOGLE_MAPS_API_KEY`;

      axios.get(directionUrl)
        .then(response => {
          const points = response.data.routes[0].overview_polyline.points;
          const decodedPoints = decodePolyline(points);
          setRouteCoordinates(decodedPoints);
        })
        .catch(err => console.log(err));
    });
  };

  // Function to decode polyline to coordinates
  const decodePolyline = (encoded) => {
    let index = 0, len = encoded.length, decoded = [], lat = 0, lng = 0;
    while (index < len) {
      let shift = 0, result = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lat += ((result & 1) ? ~(result >> 1) : (result >> 1));
      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      lng += ((result & 1) ? ~(result >> 1) : (result >> 1));
      decoded.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return decoded;
  };

  return (
    <View style={styles.container}>
      {/* Top Input Section */}
      <View style={styles.inputSection}>
        <TextInput 
          style={styles.input} 
          placeholder="Seu local" 
          placeholderTextColor="#FFFFFF"
          onChangeText={text => setDestination(text)} 
          value={destination}
        />
        <TouchableOpacity style={styles.mapButton} onPress={fetchRoute}>
          <Text style={styles.mapButtonText}>Rota</Text>
        </TouchableOpacity>
      </View>

      {/* Map Component */}
      <View style={styles.mapPlaceholder}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={origin} title="Origem" />
          {destination && <Marker coordinate={{ latitude: origin.latitude, longitude: origin.longitude }} title="Destino" />}
          <Polyline coordinates={routeCoordinates} strokeColor="#FF6347" strokeWidth={4} />
        </MapView>
      </View>

      {/* Destination Section */}
      <View style={styles.destinationSection}>
        <Text style={styles.title}>MAPA ADAPTADO</Text>
        <Text style={styles.subtitle}>Qual seu destino?</Text>
        <View style={styles.robotCircle}>
          <Image
            source={{ uri: "rb.png" }}
            style={styles.robotIcon}
          />
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>📶</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>📍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  mapButton: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 10,
    marginLeft: 5,
  },
  mapButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: "#292929",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  destinationSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#BBBBBB",
    fontSize: 16,
    marginBottom: 20,
  },
  robotCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  robotIcon: {
    width: 60,
    height: 60,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default MapScreen;
