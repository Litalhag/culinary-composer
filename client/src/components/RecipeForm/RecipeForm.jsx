import React from 'react'
import Box from '@mui/material/Box'
import IngredientAutocomplete from './IngredientAutocomplete'
import KitchenDevicesSelect from './KitchenDevicesSelect'
import PeopleNumberInput from './PeopleNumberInput'
import SubmitButton from './SubmitButton'

const RecipeForm = () => {
  const handleIngredientSelect = (value) => {
    // ingredient selection
  }

  const handleAppliancesChange = (value) => {
    // kitchen selection
  }

  const handleNumberOfPeople = (value) => {
    //  number of people
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
      <KitchenDevicesSelect onAppliancesChange={handleAppliancesChange} />
      <PeopleNumberInput onPeopleNumberChange={handleNumberOfPeople} />
      <SubmitButton />
    </Box>
  )
}

export default RecipeForm
