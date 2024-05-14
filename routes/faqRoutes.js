const { createFaq, getFaqs, getFaq, updateFaq, deleteFaq } = require('../controllers/faqController');
const authGuard = require('../middlewares/authGuard');
const upload = require('../middlewares/uploadMiddleware')

const router = require('express').Router();

router.post('/', authGuard, createFaq);
router.get('/:lng', getFaqs);
router.get('/single/:id', getFaq);
router.put('/:id', authGuard, updateFaq);
router.delete('/:id', authGuard, deleteFaq);

module.exports = router;