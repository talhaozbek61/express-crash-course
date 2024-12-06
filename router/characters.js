import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getCharacterById,
  getCharacters,
  updateCharacter,
} from "../controllers/charactersController.js";
const router = express.Router();

// Get all characters
router.get("/", getCharacters);

// Get single characters by id
router.get("/:id", getCharacterById);

// Create new characters
router.post("/", createCharacter);

// Update Character
router.put("/:id", updateCharacter);

// Delete Character
router.delete("/:id", deleteCharacter);

// Get single characters by username
//app.get("/api/characters/:username", (req, res) => {
//   console.log(req.params.username);
//   const username = req.params.username;
//   const character = characters.filter(
//     (character) => character.username === username
//   );
//   res.status(200).json(character);
// });

// app.get("/", (req, res) => {
//   //  res.send("Hello World");
//   //  res.send("<h1>Hello World</h1>");
//   //  res.send({ message: "Hello World" });
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   //   res.send("<h1>About</h1>");
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

export default router;
