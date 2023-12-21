import React from 'react'
import { Box, Typography } from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant'

const Showcase = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '550px',
        backgroundColor: 'lightgrey',
      }}
    >
      <Box
        component="img"
        sx={{
          width: '100%',
          height: '550px',
          objectFit: 'cover',
        }}
        src="/images/photo-1.jpg"
        alt="Home page"
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 2,
          }}
        >
          <RestaurantIcon
            sx={{ fontSize: '5rem', color: 'white', marginRight: 1 }}
          />
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
            }}
          >
            Culinary Composer
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Showcase
