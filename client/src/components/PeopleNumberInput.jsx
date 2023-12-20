import React, { useState } from 'react'
import { TextField } from '@mui/material'

const PeopleNumberInput = ({ onPeopleNumberChange }) => {
  const [peopleNumber, setPeopleNumber] = useState(1)

  const handleChange = (event) => {
    const number = parseInt(event.target.value, 10)
    setPeopleNumber(number)
    onPeopleNumberChange(number)
  }

  return (
    <TextField
      type="number"
      label="Number of People"
      variant="outlined"
      value={peopleNumber}
      onChange={handleChange}
      inputProps={{ min: 1, max: 20 }}
      sx={{ width: 100, m: 1 }}
    />
  )
}

export default PeopleNumberInput
