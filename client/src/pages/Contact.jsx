import React from 'react'
import { Box, Typography, Container } from '@mui/material'

const Contact = () => {
  const backgroundImage = '/images/photo-5.jpg'
  return (
    <Box sx={{ minHeight: '80vh', backgroundColor: '#fdfbfb' }}>
      {' '}
      <Container sx={{ mt: 4, minHeight: '80vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Culinary Composer
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            1234 Foodie Lane, Flavor Town, Yum 56789
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Phone: (123) 456-7890
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Email: contact@culinarycomposer.com
          </Typography>
          <Typography variant="body1" sx={{ mt: 3 }}>
            For any inquiries, feel free to reach out to us. We're always happy
            to hear from fellow food enthusiasts!
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Contact
