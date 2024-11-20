import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import PlaceDetails from './PlaceDetails';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places?.length || 0).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div style={{ padding: '25px', backgroundColor: '#1e1e1e', color: '#fff', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom>
        Explore Nearby
      </Typography>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
          <CircularProgress size="5rem" sx={{ color: 'primary.main' }} />
        </div>
      ) : (
        <>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="type" sx={{ color: 'text.secondary' }}>Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="rating" sx={{ color: 'text.secondary' }}>Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              sx={{ color: 'text.primary', backgroundColor: 'background.paper' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} sx={{ height: '75vh', overflow: 'auto', padding: '8px', backgroundColor: '#121212' }}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={place.id || i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place || {}} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
