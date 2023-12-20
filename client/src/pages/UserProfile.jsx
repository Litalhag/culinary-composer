import React, { useState } from 'react'
import { Box, Typography, Container } from '@mui/material'
import RecipeCard from '../components/RecipeCard'
import RecipeComponent from '../components/RecipeComponent/RecipeComponent'

const UserProfile = ({ user }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const handleExpandRecipe = (recipe) => {
    setSelectedRecipe(recipe)
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4">{user.name}</Typography>
        <Typography variant="body1">{user.email}</Typography>
        <Typography variant="body1">Joined: {user.dateCreated}</Typography>
      </Box>
      <Box>
        {user.recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            onExpand={handleExpandRecipe}
          />
        ))}
      </Box>
      {selectedRecipe && <RecipeComponent recipe={selectedRecipe} />}
    </Container>
  )
}

export default UserProfile
