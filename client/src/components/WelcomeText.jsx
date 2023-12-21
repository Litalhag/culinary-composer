import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import RecipeForm from './RecipeForm/RecipeForm'

const WelcomeText = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#96B6C5',
        pt: 5,
        pb: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: '#eeeeee',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          mt: -2,
          mb: 3,
          padding: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Culinary Composer!
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
          Embark on a delightful culinary journey with our innovative app
          designed to inspire your cooking adventures. Culinary Composer is here
          to transform your available ingredients into delicious, tailor-made
          recipes. Simply enter the ingredients you have at hand in our
          intuitive Ingredient Autocomplete field. Don't forget to select your
          available kitchen devices in the Kitchen Devices Select menu for
          recipes that perfectly fit your kitchen's capabilities. Planning meals
          for a group? Adjust the number of servings using our People Number
          Input to ensure everyone's appetite is satisfied.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
          Our smart system, powered by OpenAI's advanced technology, will
          interpret your input and suggest a variety of scrumptious recipes.
          Whether you're a seasoned chef or a beginner, our app will guide you
          in creating mouth-watering dishes that make the most out of your
          pantry. Plus, if you've got a picture of a dish you loved, upload it,
          and we'll help reverse-engineer the recipe for you!
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1rem', mb: 2 }}>
          So, let's get started and turn your everyday ingredients into
          extraordinary meals with Culinary Composer. Happy cooking!
        </Typography>
        <RecipeForm />
      </Container>
    </Box>
  )
}

export default WelcomeText
