const { createContent, getContents, getContent, updateContent, deleteContent } = require('../controllers/contentController');
const authGuard = require('../middlewares/authGuard');
const upload = require('../middlewares/uploadMiddleware')

const router = require('express').Router();

router.post('/', authGuard, upload.single('file'), createContent);
router.get('/', getContents);
router.get('/:id', getContent);
router.put('/:id', authGuard, updateContent);
router.delete('/:id', authGuard, deleteContent);

module.exports = router;