const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const shippingController = require('../controllers/shippingController');
const shippingValidator = require('../validation/shippingValidation');

router.get('/',   authMiddleware, shippingController.shipping);
router.get('/selected',   authMiddleware, shippingController.selectedShippingAddress);
router.post('/', shippingValidator,  authMiddleware, shippingController.addShippingAddress);
router.post('/:id/edit', shippingValidator,  authMiddleware, shippingController.editShippingAddress);
router.post('/:id/delete', authMiddleware, shippingController.deleteShippingAddress);
router.post('/:id/update', authMiddleware, shippingController.updateDefaultValute);
router.post('/checkout', authMiddleware, shippingController.checkout);

module.exports = router