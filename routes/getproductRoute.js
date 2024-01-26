
const { Router } = require("express");
const { getProduct } = require("../controllers/getProduit");

const router = Router();

router.get("/produit", getProduct);


module.exports = router;