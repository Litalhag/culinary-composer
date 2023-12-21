import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import fileUpload from "express-fileupload";
import {errorHandler} from "./middleware/errorHandler.js";
import {connectDB} from "./config/db.js";

//Load env vars (due to configuration in a separate file (e.g., config.env), we should specify the path when calling dotenv.config():
dotenv.config({ path: "config/config.env" });

// Connect to database
connectDB();


import cors from "cors";

import bodyParser from "body-parser";
import { config } from "dotenv-flow";
config({ path: "./", silent: true });
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';



// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js"
import recipesRoutes from "./routes/recipesRoutes.js"

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

// app.use('/api/v1/auth', auth);
// app.use('/api/v1/recipes', recipes);

// File uploading (such as a photo for a bootcamp)
app.use(fileUpload());

// Set static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", usersRoutes);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/recipes", recipesRoutes);

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

