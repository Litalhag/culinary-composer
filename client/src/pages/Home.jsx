import React from 'react'
import Showcase from '../components/Showcase'
import IngredientAutocomplete from '../components/IngredientAutocomplete'
import KitchenAppliancesSelect from '../components/KitchenAppliancesSelect'
import PeopleNumberInput from '../components/PeopleNumberInput'
const Home = () => {
  return (
    <>
      <Showcase />
      <IngredientAutocomplete />
      <KitchenAppliancesSelect />
      <PeopleNumberInput />
    </>
  )
}
export default Home
