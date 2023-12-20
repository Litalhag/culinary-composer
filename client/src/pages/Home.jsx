import React from 'react'
import Showcase from '../components/Showcase'
// import RecipeForm from '../components/RecipeForm/RecipeForm'
import WelcomeText from '../components/WelcomeText'
import RecipeComponent from '../components/RecipeComponent/RecipeComponent'
import ImageInHome from '../components/ImageInHome'

const Home = () => {
  return (
    <>
      <Showcase />
      <WelcomeText />
      <ImageInHome />

      {/* <RecipeForm /> */}
      <RecipeComponent />
    </>
  )
}
export default Home
