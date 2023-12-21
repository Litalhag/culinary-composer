import React from 'react'
import { Card, CardContent, Typography, CardMedia } from '@mui/material'

const RecipeCard = ({ recipe }) => {
  if (!recipe || !recipe.revisedPromptURL) {
    return <p>No recipe data available</p>
  }
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.revisedPromptURL}
        alt="Recipe Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Recipe
        </Typography>
        <Typography>{recipe.revisedPromptDescription}</Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.recipeText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default RecipeCard
