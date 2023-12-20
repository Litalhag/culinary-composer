import React, { useState } from 'react'
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material'

const KitchenAppliancesSelect = ({ onAppliancesChange }) => {
  const [selectedAppliances, setSelectedAppliances] = useState([])

  const appliancesList = [
    'Oven',
    'Blender',
    'Microwave',
    'Toaster',
    'Mixer',
    'Grill',
  ]

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedAppliances(typeof value === 'string' ? value.split(',') : value)
    onAppliancesChange(value)
  }

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="kitchen-appliances-label">Kitchen Appliances</InputLabel>
      <Select
        labelId="kitchen-appliances-label"
        multiple
        value={selectedAppliances}
        onChange={handleChange}
        input={<OutlinedInput label="Kitchen Appliances" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {appliancesList.map((appliance) => (
          <MenuItem key={appliance} value={appliance}>
            {appliance}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default KitchenAppliancesSelect
