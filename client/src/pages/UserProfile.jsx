import React, { useState } from 'react'
import { Box, Typography, Container, Grid } from '@mui/material'
import RecipeCard from '../components/RecipeCard'
import { useGlobalAuthContext } from '../Hooks/useGlobalAuthContext'
import { useGlobalRecipeContext } from '../Hooks/useGlobalRecipeContext'

const UserProfile = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const { user } = useGlobalAuthContext()
  const { recipes } = useGlobalRecipeContext()

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4">{user?.name}</Typography>
        <Typography variant="body1">{user?.email}</Typography>
      </Box>
      <Grid container spacing={2}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
      {selectedRecipe && <RecipeComponent recipe={selectedRecipe} />}
    </Container>
  )
}

export default UserProfile
