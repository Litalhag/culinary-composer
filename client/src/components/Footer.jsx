import React from 'react'
import { Box, Typography, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#96B6C5',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Culinary Composer All rights reserved
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        <Link href="/terms" color="inherit">
          Terms & Conditions
        </Link>
        <Link href="/privacy" sx={{ marginX: '15px' }} color="inherit">
          Privacy Policy
        </Link>
        <Link href="/contact" color="inherit">
          Contact Us
        </Link>
      </Box>
    </Box>
  )
}

export default Footer
