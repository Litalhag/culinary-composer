# Web App Design Document: Culinary Composer

## Executive Summary

Culinary Composer is an innovative web application designed to transform available ingredients into scrumptious recipes. Utilizing OpenAI's advanced API, it interprets user-provided ingredients through text or images and suggests detailed cooking recipes. The app considers the user's kitchen appliances to ensure practical, tailor-made recipes. Additionally, users can upload images of finished dishes to reverse-engineer the cooking process. The goal is to streamline meal preparation and enhance the culinary use of household ingredients.

## App Name

**Culinary Composer**

## Front-End Design

### Pages

#### Home Page

- **Purpose**: Act as the central hub for navigation and app introduction.
- **Components**:
  - Header with App Logo and Navigation Bar
  - Introduction Text
  - Feature Selection Buttons: Manual Ingredient Entry, Dish Image Upload, Ingredients Image Upload
  - Footer with links and information

#### Recipe Generator Page

- **Purpose**: Allow manual entry of ingredients and selection of available kitchen appliances.
- **Components**:
  - Dynamic Ingredient Input Form
  - Cooking Device Selector
  - Submit Button for recipe creation
  - Back Navigation

#### Image Of Ingredients Upload Page

- **Purpose**: Allow users to upload images of ingredients for recipe suggestions.
- **Components**:
  - Image Upload Interface
  - Image Quality Guidelines
  - Analyze Button
  - Back Navigation

#### Recipe Display Page

- **Purpose**: Showcase the generated recipe with instructions and images.
- **Components**:
  - Recipe Information Display
  - New Search Button
  - Save/Share Functionality
  - Back Navigation

#### User Profile Page

- **Purpose**: Enable users to view and manage saved recipes and account information.
- **Components**:
  - User Information Section
  - Saved Recipes Gallery
  - Profile Editing Options
  - Back Navigation

#### About Page

- **Purpose**: Provide detailed information about the app, its mission, and developers.
- **Components**:
  - App Information Content
  - User Testimonials
  - Back Navigation

#### Contact Page

- **Purpose**: Offer a direct line of communication for user support and feedback.
- **Components**:
  - Contact Form
  - Direct Contact Information
  - FAQ Section
  - Back Navigation

### Shared Components

#### Header Component

- **Purpose**: Consistent navigation and brand presentation.
- **Components**:
  - App Logo
  - Navigation Menu

#### Footer Component

- **Purpose**: Offer additional navigation and information.
- **Components**:
  - About and Contact Page Links
  - Social Media Links
  - Copyright Information

#### Google Sign-In Component

- **Purpose**: Provide an easy and secure method for user authentication.
- **Components**:
  - Google Sign-In Button

## Back-End Design

### Schema Models

#### User Model

- **Purpose**: Store user account information and preferences.
- **Fields**: User ID, Email, Google UID (from Firebase), Preferences, Creation Timestamp

#### Recipe Model

- **Purpose**: Store and retrieve recipe data.
- **Fields**: Recipe ID, Title, Ingredients, Instructions, user's uploaded Image URL, recipe Image URL output, User ID, Creation Timestamp
- **Permissions**: Users can read and save recipes to their profile.

### Controllers

#### FirebaseAuthController

- **Purpose**: Handle authentication using Firebase.
- **Functionality**: Register, log in, and manage user sessions using Firebase Auth.

#### RecipeController

- **Purpose**: Manage the lifecycle of recipes in the application.
- **Functionality**: Post by text, Post by image, Get all user's recipes, Get a single recipe by user

### Routes

#### Firebase Authentication Routes

- `/firebase/auth`
  - `POST /register` - Register a new user
  - `POST /login` - Log in an existing user
  - `POST /logout` - Log out the user

#### Recipe Routes

- `/recipes`
  - `POST /:userId/upload` - Create a new recipe based on user image - returns a new recipe
  - `POST /:userId/create` - Create a new recipe based on user criteria - returns a new recipe
  - `GET /:userId` - Get all user's recipes
  - `GET /:userId/:recipeId` - Get a single user's recipe
