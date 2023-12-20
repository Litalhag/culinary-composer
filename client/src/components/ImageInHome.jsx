import React from 'react'
import { Box } from '@mui/material'

const ImageInHome = () => {
  const backgroundImage = '/images/photo-6.jpg'

  return (
    <Box
      sx={{
        width: '100%',
        height: 200,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginY: 0,
        borderRadius: '5px',
      }}
    />
  )
}

export default ImageInHome
