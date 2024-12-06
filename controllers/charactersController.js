let characters = [
  {
    id: 1,
    username: "don_vito",
    fullName: "Vito Corleone",
  },
  {
    id: 2,
    username: "michael_c",
    fullName: "Michael Corleone",
  },
  {
    id: 3,
    username: "sonny_c",
    fullName: "Sonny Corleone",
  },
];

// @desc   Get all Characters
// @route  GET /api/characters
export const getCharacters = (req, res, next) => {
  const limit = req.query.limit;
  if (!isNaN(limit) && limit > 0)
    return res.status(200).json(characters.slice(0, limit));

  res.status(200).json(characters);
};

// @desc   Get single character
// @route  GET /api/characters/:id
export const getCharacterById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const character = characters.find((character) => character.id === id);

  if (!character) {
    const error = new Error(`A post with id of ${id} is not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(character);
};

// @desc   Create new character
// @route  POST /api/characters
export const createCharacter = (req, res, next) => {
  const newCharacter = {
    id: characters.length + 1,
    username: req.body.username,
    fullName: req.body.fullName,
  };
  if (!newCharacter.username) {
    const error = new Error(`please include a username`);
    error.status = 404;
    return next(error);
  }

  characters.push(newCharacter);
  res.status(201).json(characters);
};

// @desc   Update character
// @route  PUT /api/characters/:id
export const updateCharacter = (req, res, next) => {
  const id = parseInt(req.params.id);
  const character = characters.find((character) => character.id === id);

  if (!character) {
    const error = new Error(`Character not found`);
    error.status = 404;
    return next(error);
  }

  character.fullName = req.body.fullName;
  character.username = req.body.username;
  res.status(200).json(characters);
};

// @desc   Delete character
// @route  DELETE /api/characters/:id
export const deleteCharacter = (req, res, next) => {
  const id = parseInt(req.params.id);
  const character = characters.find((character) => character.id === id);

  if (!character) {
    const error = new Error(`Character not found`);
    error.status = 404;
    return next(error);
  }

  characters = characters.filter((character) => character.id !== id);
  res.status(200).json(characters);
};
