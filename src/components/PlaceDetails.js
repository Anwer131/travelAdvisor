import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/material/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected && refProp?.current) {
    refProp.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <Card elevation={6} sx={{ marginBottom: 2, backgroundColor: 'background.paper', color: 'text.primary' }}>
      <CardMedia
        component="img"
        height="200"
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        alt={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{ fontWeight: 600 }}>
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly sx={{ color: 'primary.main' }} />
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend" sx={{ color: 'text.secondary' }}>Price</Typography>
          <Typography variant="subtitle1">{place.price_level || 'N/A'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend" sx={{ color: 'text.secondary' }}>Ranking</Typography>
          <Typography variant="subtitle1">{place.ranking || 'N/A'}</Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
            key={award.display_name}
          >
            <img src={award.images.small} alt={award.display_name} style={{ marginRight: '8px' }} />
            <Typography variant="subtitle2" color="text.secondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        <Box display="flex" flexWrap="wrap" mt={1}>
          {place?.cuisine?.map(({ name }) => (
            <Chip
              key={name}
              size="small"
              label={name}
              sx={{ margin: '5px', backgroundColor: 'primary.light', color: 'text.primary' }}
            />
          ))}
        </Box>
        {place.address && (
          <Typography gutterBottom variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <LocationOnIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="text.secondary">
            <PhoneIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {place.web_url && (
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, '_blank')}
          >
            Trip Advisor
          </Button>
        )}
        {place.website && (
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, '_blank')}
          >
            Website
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
