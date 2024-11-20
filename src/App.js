import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI';
import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [bounds, setBounds] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Set initial user location or fallback
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Geolocation error:', error.message);
        // Fallback to default location
        setCoords({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
      }
    );
  }, []);

  // Filter places by rating
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating, places]);

  // Fetch places and weather data
  useEffect(() => {
    if (!bounds || !bounds.sw || !bounds.ne) return;

    setIsLoading(true);

    Promise.all([
      getWeatherData(coords.lat, coords.lng),
      getPlacesData(type, bounds.sw, bounds.ne),
    ])
      .then(([weather, placesData]) => {
        if (weather) setWeatherData(weather);
        if (placesData) {
          const validPlaces = placesData.filter((place) => place.name && place.num_reviews > 0);
          setPlaces(validPlaces);
          setFilteredPlaces([]); // Clear filters when new data loads
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [bounds, type, coords.lat, coords.lng]);

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
