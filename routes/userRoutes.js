const { createUser, loginUser, logoutUser, getName, checkUser, getUsers, deleteUser } = require('../controllers/userController');
const authGuard = require('../middlewares/authGuard');
const { body } = require('express-validator');

const router = require('express').Router();

router.post('/create', createUser);
router.post('/login', body("name").escape(), body("password").escape(), loginUser);
router.post('/logout', logoutUser);
router.get('/', authGuard, getName);
router.get('/all', authGuard, getUsers);
router.delete('/:id', authGuard, deleteUser);
router.get('/check', checkUser);

module.exports = router;