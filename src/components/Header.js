import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ setCoords }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const geocodingAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;
      console.log('Fetching:', geocodingAPI);

      const response = await fetch(geocodingAPI);
      const data = await response.json();

      console.log('Geocoding Response:', data);

      if (data.features && data.features.length > 0) {
        const { center } = data.features[0];
        setCoords({ lat: center[1], lng: center[0] });
      } else {
        alert('No results found. Please try another location.');
      }
    } catch (error) {
      console.error('Error with geocoding API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'secondary', boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Travel Advisor
        </Typography>
        <Box display="flex" alignItems="center" sx={{ backgroundColor: 'background.paper', borderRadius: 2, px: 2, py:1 }}>
          <SearchIcon sx={{ color: 'text.secondary' }} />
          <InputBase
            placeholder="Search a location…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ ml: 1, color: 'text.primary' }}
          />
          <Button variant="contained" color='green' onClick={handleSearch} disabled={loading} sx={{ ml: 1, padding: 1 }}>
            {loading ? 'Searching...' : 'Go'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
