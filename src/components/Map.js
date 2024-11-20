import React, { useEffect } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Map = ({ coords, places, setCoords, setBounds }) => {
  const [viewport, setViewport] = React.useState({
    latitude: coords?.lat ?? 5,
    longitude: coords?.lng ?? 4,
    zoom: 14,
    width: '100%',
    height: '100%',
  });

  const darkMapStyle = "mapbox://styles/mapbox/dark-v10"; // Dark map style

  useEffect(() => {
    if (typeof coords.lat === 'number' && typeof coords.lng === 'number') {
      setViewport((prev) => ({
        ...prev,
        latitude: coords.lat,
        longitude: coords.lng,
      }));
    }
  }, [coords]);

  return (
    <div style={{ height: '85vh', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapGL
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        onMove={(event) => {
          const newViewport = event.viewState;
          setViewport(newViewport);
          setCoords({ lat: newViewport.latitude, lng: newViewport.longitude });
          setBounds({
            ne: { lat: newViewport.latitude + 0.05, lng: newViewport.longitude + 0.05 },
            sw: { lat: newViewport.latitude - 0.05, lng: newViewport.longitude - 0.05 },
          });
        }}
        mapStyle={darkMapStyle} // Apply dark map style
      >
        {places
          ?.filter((place) => Number(place.latitude) && Number(place.longitude))
          .map((place, i) => (
            <Marker key={i} latitude={Number(place.latitude)} longitude={Number(place.longitude)}>
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            </Marker>
          ))}
      </MapGL>
    </div>
  );
};

export default Map;
