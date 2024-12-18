const express = require("express");
const router = express.Router();

const Controllers = require("../controllers");
const User = Controllers.User;

router.post("/purchase", User.Purchage);
router.get("/purchase/recent/:userId", User.GetRecentPurchases);
module.exports = router;
