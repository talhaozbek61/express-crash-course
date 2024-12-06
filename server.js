import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import characters from "./router/characters.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const PORT = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json()); // raw
app.use(express.urlencoded({ extended: false })); //form-urlencoded

app.use(logger);

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/characters", characters);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
