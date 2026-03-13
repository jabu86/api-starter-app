const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const productController = require('../controllers/productController');
const validateProduct = require('../validation/productValidation');
const upload = require("../middleware/upload");
const {
    uploadProductImages,
    processProductImages,
} = require("../middleware/uploadProductImages");

/**
 * index route
 * Get all products
 */
router.get('/products' ,productController.index);



/**
 * create routes
 * Create products
 */

router.post(
    "/products",
    uploadProductImages,
    processProductImages,
    validateProduct,
    productController.create

);

/**
 * update routes
 * update products
 */
router.put('/products' ,upload.single("brand"),productController.update);


/**
 * delete brand
 * delete products
 */
router.delete('/prodcuts/:id' ,productController.delete);





module.exports = router