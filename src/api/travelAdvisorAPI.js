import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
        params: {
          lat,
          lon: lng,
          appid: process.env.REACT_APP_RAPID_API_WEATHER_API_KEY, // Replace with your key
          units: 'metric',
        },
      });

      return data;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.response || error.message);
  }
};

