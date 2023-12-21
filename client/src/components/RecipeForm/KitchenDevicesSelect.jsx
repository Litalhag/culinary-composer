import React, { useState } from 'react'
import { TextField, Autocomplete } from '@mui/material'

const KitchenDevicesSelect = ({ onDevicesSelect }) => {
  const [value, setValue] = useState([])

  const devicesList = [
    'Oven',
    'Blender',
    'Microwave',
    'Toaster',
    'Mixer',
    'Grill',
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue)
    onDevicesSelect(newValue)
  }

  return (
    <Autocomplete
      multiple
      id="devices-autocomplete"
      options={devicesList}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="devices" placeholder="Select devices" />
      )}
      sx={{ width: 300 }}
    />
  )
}

export default KitchenDevicesSelect
