import React from 'react'
import { Box, Container } from '@mui/material'
import AboutContent from './AboutContent'

const About = () => {
  const backgroundImage = '/images/photo-4.jpg'

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '85vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: 'scaleX(-1)',
        pt: { xs: 10, sm: 12 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          color: '#fff',
          textAlign: 'left',
          padding: '20px',
          maxWidth: 'md',
          transform: 'scaleX(-1)',
          marginRight: 0,
          width: '50%',
        }}
      >
        <AboutContent sx={{ transform: 'scaleX(-1)' }} />
      </Container>
    </Box>
  )
}

export default About
