const { createUser, loginUser, logoutUser, getName, checkUser, getUsers } = require('../controllers/userController');
const authGuard = require('../middlewares/authGuard');

const router = require('express').Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/', authGuard, getName);
router.get('/all', authGuard, getUsers);
router.get('/check', checkUser);

module.exports = router;