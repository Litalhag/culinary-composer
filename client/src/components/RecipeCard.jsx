import React from 'react'
import { Card, CardContent, Typography, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const RecipeCard = ({ recipe, onExpand }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {recipe.title}
        </Typography>
        <IconButton onClick={() => onExpand(recipe)}>
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default RecipeCard
