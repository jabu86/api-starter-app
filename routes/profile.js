const express = require('express')
const upload = require("../middleware/upload");
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const profileController = require('../controllers/profileController');
//index route
router.get('/profile', authMiddleware, roleMiddleware('admin' , 'user') ,profileController.index);
router.post('/profile', upload.single("image"), authMiddleware, roleMiddleware('admin' , 'user') ,profileController.profileUpdate);

module.exports = router