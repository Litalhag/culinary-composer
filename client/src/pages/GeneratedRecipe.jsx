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

  return currentRecipe ? (
    <RecipeCard recipe={currentRecipe} />
  ) : (
    <p>Loading recipe...</p>
  )
}

export default GeneratedRecipe
