const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Route to create a new wishlist entry
router.post('/wishlist', wishlistController.createWishlist);

// Route to get all wishlist entries
router.get('/wishlist', wishlistController.getAllWishlists);

// Route to get wishlist entries for a specific student
router.get('/wishlist/:student_id', wishlistController.getWishlistByStudentId);

// Route to update a wishlist entry
router.put('/wishlist/:wishlist_id', wishlistController.updateWishlist);

// Route to delete a wishlist entry
router.delete('/wishlist/:wishlist_id', wishlistController.deleteWishlist);

module.exports = router;
