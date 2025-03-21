const express = require("express");
const { getUserCart, addToCart, RemoveFromCart } = require("../controllers/CartControllers");
const router = express.Router();


router.get("/Get-user-cart", getUserCart);
router.post("/Add-to-cart",addToCart);
router.delete("/Remove-from-cart",RemoveFromCart);

module.exports = router;
