const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const orderController = require('../controllers/orderController');
    

// /api/user/order
router.get('/user/orders',  authMiddleware, orderController.getUserOrders);
router.post('/user/orders' , authMiddleware, orderController.createOrders);
router.get('/orders', authMiddleware, roleMiddleware('admin', 'user') , orderController.getAllOders);
router.get('/orders/:id' , authMiddleware, orderController.getByIdOrder);
router.post('/user/orders/:id/pay' , authMiddleware, orderController.payOrderItem);
router.post('/orders/:id/mark-delivered' , authMiddleware, roleMiddleware("admin"), orderController.markOrdrAsDelivered);



module.exports = router