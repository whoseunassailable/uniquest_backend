const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController.js');

// Route to create a wishlist item
router.post('/wishlist', wishlistController.createWishlistItem);

// Route to get all wishlist items
router.get('/wishlist', wishlistController.getAllWishlistItems);

// Route to get a wishlist item by ID
router.get('/wishlist/:wishlist_id', wishlistController.getWishlistItemById);

// Route to update a wishlist item
router.put('/wishlist/:wishlist_id', wishlistController.updateWishlistItem);

// Route to delete a wishlist item
router.delete('/wishlist/:wishlist_id', wishlistController.deleteWishlistItem);

module.exports = router;
