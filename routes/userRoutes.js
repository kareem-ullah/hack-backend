// const express = require('express');
// const router = express.Router();
// const { getUsers } = require('../controllers/userController');

// // GET /api/users
// router.get('/', getUsers);

// module.exports = router;




const express = require('express')
const router = express.Router()
const { getUsers } = require('../controllers/userController')
const auth = require('../middleware/auth')
router.get('/', auth, getUsers)
module.exports = router