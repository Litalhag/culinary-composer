import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IngredientAutocomplete from './IngredientAutocomplete'
import KitchenDevicesSelect from './KitchenDevicesSelect'
import PeopleNumberInput from './PeopleNumberInput'
import SubmitButton from './SubmitButton'
import { useNavigate } from 'react-router-dom'
// import { recipeAPI } from '../../api'
import { useGlobalRecipeContext } from '../../Hooks/useGlobalRecipeContext.js'

const RecipeForm = () => {
  const { addNewRecipe } = useGlobalRecipeContext()
  const [promptDetails, setPromptDetails] = useState({
    ingredients: [],
    devices: [],
    number: 1,
  })

  const navigate = useNavigate()

  const handleIngredientSelect = (ingredients) => {
    console.log('Selected Ingredients:', ingredients)
    setPromptDetails({ ...promptDetails, ingredients })
  }

  const handleDevicesSelect = (devices) => {
    console.log('Selected Devices:', devices)
    setPromptDetails({ ...promptDetails, devices })
  }

  const handleNumberOfPeople = (number) => {
    console.log('Number of People:', number)
    setPromptDetails({ ...promptDetails, number })
  }

  const handleSubmit = async () => {
    console.log('Submitting Form with Data:', promptDetails)
    try {
      const response = await addNewRecipe(promptDetails)
      // const recipeData = JSON.stringify(response.data)
      console.log('Navigating with recipeData:', response)
      if (response && response.data._id) {
        navigate(`/generatedRecipe/${response.data._id}`)
      } else {
        console.log('Recipe creation response is missing _id')
      }
      // navigate(`/generatedRecipe/${encodeURIComponent(recipeData)}`)
      // navigate(`/generatedRecipe`)
      // const recipeId = response.data?._id
      // if (recipeId) {
      //   navigate(`/generatedRecipe/${recipeId}`)
      // } else {
      //   console.log('No recipe ID received')
      // }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        p: 3,
        borderRadius: 2,
        margin: 'auto',
        marginTop: 5,
        marginBottom: 1,
        width: 'fit-content',
      }}
    >
      <IngredientAutocomplete onIngredientSelect={handleIngredientSelect} />
      <KitchenDevicesSelect onDevicesSelect={handleDevicesSelect} />
      <PeopleNumberInput onPeopleNumberChange={handleNumberOfPeople} />
      <SubmitButton onClick={handleSubmit} />
    </Box>
  )
}

export default RecipeForm
