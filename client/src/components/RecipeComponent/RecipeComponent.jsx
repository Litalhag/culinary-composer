import React from 'react'
import { Box, Typography } from '@mui/material'
import hardcodedRecipe from './hardcodedRecipe'

const RecipeComponent = ({ recipe = hardcodedRecipe }) => {
  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#fdfbfb',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        maxWidth: '60rem',
        margin: '20px auto',
        display: 'block',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {recipe.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Ingredients:
      </Typography>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            <Typography variant="body1">{ingredient}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="subtitle1" gutterBottom>
        Kitchen Devices:
      </Typography>
      <ul>
        {recipe.devices.map((device, index) => (
          <li key={index}>
            <Typography variant="body1">{device}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="subtitle1" gutterBottom>
        Instructions:
      </Typography>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>
            <Typography variant="body1">{instruction}</Typography>
          </li>
        ))}
      </ol>
    </Box>
  )
}

export default RecipeComponent
