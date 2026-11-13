const express = require("express");
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');
const indexController = require("../controllers/index");
const validateContactForm = require("../validation/contactFormValidation");

//index route
router.get("/", indexController.index);
// define the home page route
router.get("/home", indexController.home);
// define the about route
router.get("/about", indexController.about);

/**
 * @desc Send a message to the owner
 * @route POST /api/contact-us
 * @access Public
 */
router.post("/contact-us", validateContactForm, indexController.contact);
/**
 * @desc Get products with pagination and filtering
 * @route GET /api/products
 * @access Public
 */
router.get("/shop", indexController.products);

/**
 * @desc Get a single product by slug
 * @route GET /api/shop/:slug
 * @access Public
 */
router.get("/shop/:slug", indexController.product);

/**
 * @desc Get all categories
 * @route GET /api/categories
 * @access Public
 */
router.get("/categories", indexController.getCategory);
/**
 * @desc Get all brands
 * @route GET /api/brands
 * @access Public
 */
router.get("/brands", indexController.getBrands);

/**
 * @desc Get latest products
 * @route GET /api/latest
 * @access Public
 */
router.get("/latest", indexController.getLatestProducts);

/**
 * @desc Get featured brands
 * @route GET /api/featured-brands
 * @access Public
 */
router.get("/featured-brands", indexController.featuredBrands);

/**
 * @desc Get top-rated products
 * @route GET /api/top-rated
 * @access Public
 */
router.get("/top-rated", indexController.getTopRatedProducts);

/**
 * @desc Get best-selling products
 * @route GET /api/best-selling
 * @access Public
 */
router.get("/best-selling", indexController.getTopSellingProducts);

/**
 * @desc Get categories and there products
 * @route GET /api/products-categories
 * @access Public
 */
router.get("/products-categories", indexController.getProductCategories);

module.exports = router;
