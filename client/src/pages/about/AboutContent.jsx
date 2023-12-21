import { Box, Typography } from '@mui/material'
import React from 'react'

const AboutContent = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        borderRadius: '5px',
        color: '#fff',
        margin: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        About Culinary Composer
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Culinary Composer, an innovative web application
        revolutionizing the way we think about cooking and meal preparation. Our
        mission is to transform your available ingredients into delightful and
        scrumptious recipes, seamlessly and intuitively.
      </Typography>
      <Typography variant="body1" paragraph>
        At the heart of Culinary Composer is OpenAI's advanced API, which powers
        our app to interpret user-provided ingredients through text or images.
        Whether you have a pantry full of items or just a few leftovers, our app
        suggests detailed cooking recipes that breathe new life into your
        ingredients.
      </Typography>
      <Typography variant="body1" paragraph>
        Understanding that every kitchen is unique, Culinary Composer considers
        the user's available kitchen appliances. This ensures the recipes we
        suggest are not only mouth-watering but also practical and tailored to
        your specific kitchen setup.
      </Typography>
      <Typography variant="body1" paragraph>
        Pushing the boundaries of culinary innovation, users can also upload
        images of finished dishes. Our app then reverse-engineers the cooking
        process, providing you with the recipe to recreate these delicious meals
        at home.
      </Typography>
      <Typography variant="body1" paragraph>
        Our goal is simple yet ambitious: to streamline meal preparation and
        enhance the culinary use of household ingredients. Culinary Composer is
        more than just an app; it's your partner in the kitchen, helping to
        unlock your culinary potential and making cooking a joyful and creative
        experience.
      </Typography>
    </Box>
  )
}
export default AboutContent
