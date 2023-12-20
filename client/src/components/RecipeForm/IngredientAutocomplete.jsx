import React, { useState } from 'react'
import { TextField, Autocomplete } from '@mui/material'
import ingredientsList from './ingredients'

const IngredientAutocomplete = ({ onIngredientSelect }) => {
  const [value, setValue] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    onIngredientSelect(newValue)
  }

  return (
    <Autocomplete
      multiple
      id="ingredients-autocomplete"
      options={ingredientsList}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ingredients"
          placeholder="Select ingredients"
        />
      )}
      sx={{ width: 300 }}
    />
  )
}

export default IngredientAutocomplete
