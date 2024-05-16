const { body } = require('express-validator');
const sendEmail = require('../controllers/emailController');

const router = require('express').Router();

const removeSpaces = (value) => {
    return value?.replace(/\s/g, '');
  };

router.post(
    '/:lng',
    body('name').notEmpty().withMessage({else:'Name is required', tr:'Ad boş ola bilməz'}).escape(),
    body('email').isEmail().withMessage({else:'İnvalid email address', tr:'Email adresi səhvdir'}),
    body('number').customSanitizer(removeSpaces).isNumeric().withMessage({else: 'Number cannot contain letters(a-Z) or special characters', tr: 'Nömrədə hərflər (a-Z) və ya kənar obyektlər ola bilməz'}),
    body('number').isLength({ min: 6, max: 17 }).withMessage({else: 'Invalid phone number', tr: 'Telefon nömrəsi səhvdir'}),
    body('place').isIn(['Instagram', 'Facebook', 'Linkedin', 'Friends', 'Others']).withMessage({else: 'Invalid input', tr: 'Səhv daxiletmə'}),
    body('message').notEmpty().withMessage({else:'Message is required', tr:'Mesaj boş ola bilməz'}).escape(), 
    sendEmail);

module.exports = router;