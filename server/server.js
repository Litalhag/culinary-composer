const express = require("express");
const { OpenAI } = require("openai");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require('colors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const auth = require('./routes/auth');
const recipes = require('./routes/recipes');

const app = express();

app.use(express.json());

app.use(cookieParser());


// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 5
});
app.use(limiter); 

// Enable CORS
app.use(cors());

app.use('/api/v1/auth', auth);
app.use('/api/v1/recipes', recipes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
