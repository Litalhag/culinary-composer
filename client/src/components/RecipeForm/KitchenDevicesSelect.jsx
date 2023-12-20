import React, { useState } from 'react'
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material'

const KitchenDevicesSelect = ({ onDevicesChange }) => {
  const [selectedDevices, setSelectedDevices] = useState([])

  const devicesList = [
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
    setSelectedDevices(typeof value === 'string' ? value.split(',') : value)
    onDevicesChange(value)
  }

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="kitchen-devices-label">Kitchen Devices</InputLabel>
      <Select
        labelId="kitchen-devices-label"
        multiple
        value={selectedDevices}
        onChange={handleChange}
        input={<OutlinedInput label="Kitchen Devices" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {devicesList.map((device) => (
          <MenuItem key={device} value={device}>
            {device}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default KitchenDevicesSelect
