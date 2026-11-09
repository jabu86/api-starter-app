const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const reviewsController = require('../controllers/reviewController');
const validateReviews = require('../validation/reviewValidation');
    

// /api/user/order
//api/reviews/3/edit
router.get('/:id', reviewsController.getProductReviews);
router.post('/',validateReviews,  authMiddleware, reviewsController.createReview);
router.post('/:id/edit',validateReviews,  authMiddleware, reviewsController.updateReview);
router.delete('/:id/delete',  authMiddleware, reviewsController.deleteReview);
module.exports = router