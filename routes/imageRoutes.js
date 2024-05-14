const getImage = require('../controllers/imageController');

const router = require('express').Router();

router.get('/:id', getImage);

module.exports = router;