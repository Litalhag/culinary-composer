import React, { createContext, useState, useEffect, useCallback } from 'react'

import { recipeAPI } from '../api'

import { showToast } from '../utils'

export const RecipeContext = createContext()

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchRecipes = async () => {
    setIsLoading(true)
    try {
      const response = await recipeAPI.getAllRecipes();
      setRecipes(response.data)
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecipe = useCallback(async (recipeId) => {
    setIsLoading(true)
    try {
      const response = await recipeAPI.getRecipe(recipeId)
      console.log('Fetch Recipe Data:', response)
      setCurrentRecipe(response.data)
      console.log('Current Recipe:', currentRecipe)
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecipes()
  }, [])

  const addNewRecipe = async (recipe) => {
    setIsLoading(true)
    try {
      const response = await recipeAPI.addRecipe(recipe)
      handleSuccess('Recipe added successfully')
      return response.data
    } catch (err) {
      showToast('An error occurred while adding the recipe', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccess = (message) => {
    fetchRecipes()
    showToast(message)
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        currentRecipe,
        isLoading,
        fetchRecipe,
        addNewRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}
