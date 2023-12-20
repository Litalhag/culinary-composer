import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const IngredientAutocomplete = ({ onIngredientSelect }) => {
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const ingredients = [
    'Apple',
    'Banana',
    'Carrot',
    'Dates',
    'Eggplant',
    'Fig',
    'Garlic',
    'Honey',
  ]

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
        onIngredientSelect(newValue)
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      id="ingredients-autocomplete"
      options={ingredients}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Ingredients" />}
    />
  )
}

export default IngredientAutocomplete
