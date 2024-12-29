const express = require('express');
const { validateToken } = require('../helper/jwt'); // Middleware for token validation
const { createUser } = require('../controller/userController');
const { createNote } = require('../controller/notesController');

const router = express.Router();

// User routes
router.post('/createUser', validateToken, createUser);

// Notes routes
router.post('/createNote',validateToken, createNote);

module.exports = router;
