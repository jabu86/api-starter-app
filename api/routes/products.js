const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const productController = require('../controllers/admin/productController');
const validateProduct = require('../validation/productValidation');
const upload = require("../middleware/upload");
const {
    uploadProductImages,
    processProductImages,
} = require("../middleware/uploadProductImages");

/**
 * index route
 * Get all products and it's sub categories
 */
router.get('/products',authMiddleware, roleMiddleware('admin', 'user') ,productController.index);
router.get('/products/category', authMiddleware, roleMiddleware('admin', 'user') ,productController.category);
router.get('/products/brands', authMiddleware, roleMiddleware('admin', 'user') ,productController.brands);
router.get('/products/sub-category', authMiddleware, roleMiddleware('admin', 'user') ,productController.subCategory);
router.get('/products/colors',authMiddleware, roleMiddleware('admin', 'user') ,productController.colors);
router.get('/products/sizes', authMiddleware, roleMiddleware('admin', 'user'),productController.sizes);


/**
 * create routes
 * Create products
 */
router.post(
    "/products",
    uploadProductImages,
    processProductImages,
    validateProduct, authMiddleware,roleMiddleware('admin', 'user'),
    productController.create
);

/**
 * update routes
 * update products
 */
router.post('/products/:id' ,
    uploadProductImages,
    processProductImages,
    validateProduct,
    authMiddleware,roleMiddleware('admin', 'user'),
    productController.update
);


/**
 * delete brand
 * delete products
 */
router.delete('/products/:id' ,authMiddleware, roleMiddleware("admin", "user"), productController.delete);

router.delete('/products/:id/image', authMiddleware,roleMiddleware("admin", "user") ,productController.deleteImage);

module.exports = router