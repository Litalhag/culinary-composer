import { useContext } from 'react'

import { RecipeContext } from '../context/RecipeContext'

export const useGlobalRecipeContext = () => {
  return useContext(RecipeContext)
}
