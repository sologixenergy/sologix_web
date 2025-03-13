const express = require("express");
const { getUserCart, addToCart } = require("../controllers/CartControllers");
const router = express.Router();


router.get("/Get-user-cart", getUserCart);
router.get("/Add-to-cart",addToCart);

module.exports = router;
