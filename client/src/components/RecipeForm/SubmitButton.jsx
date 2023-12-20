import { Button } from '@mui/material'
import React from 'react'

const SubmitButton = () => {
  return (
    <Button
      variant="contained"
      sx={{
        marginTop: 2,
        background: '#96B6C5',
        padding: '0.7rem',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          background: 'transparent',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.9)',
        },
        backgroundImage: 'linear-gradient(to bottom, #96B6C5 0%, #a5c9da 100%)',
        transition: 'all 0.3s ease',
      }}
    >
      Submit
    </Button>
  )
}
export default SubmitButton
