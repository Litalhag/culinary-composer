import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { useGlobalRecipeContext } from '../Hooks/useGlobalRecipeContext'

const GeneratedRecipe = () => {
  const { recipeId } = useParams()
  const { fetchRecipe, currentRecipe } = useGlobalRecipeContext()

  useEffect(() => {
    if (recipeId) {
      fetchRecipe(recipeId)
    }
  }, [recipeId, fetchRecipe])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      {currentRecipe ? (
        <RecipeCard recipe={currentRecipe} />
      ) : (
        <p>Loading recipe...</p>
      )}
    </Box>
  )
}

export default GeneratedRecipe;