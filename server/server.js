import express from "express";
import { OpenAI } from "openai";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import colors from 'colors';
import fs from "fs/promises";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import { config } from "dotenv-flow";
config({ path: "./", silent: true });
import mongoSanitize from 'express-mongo-sanitize';
// import getOpenAiInstance from "./openAI/openai.js";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {errorHandler} from './middleware/error.js';
import {connectDB} from './config/db.js';

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

import auth from './routes/auth.js';
import recipes from './routes/recipes.js';

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

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
