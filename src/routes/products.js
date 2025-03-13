const express = require("express");
const { Get_All_Products, Upload_Products, Get_Single_Product} = require("../controllers/ProductController");
const router = express.Router();

router.get("/Get-products", Get_All_Products); 
router.post("/Post-products",Upload_Products);
router.get("/Get-single-product",Get_Single_Product);




module.exports=router;