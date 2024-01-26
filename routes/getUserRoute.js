
const { Router } = require("express");
const { getUsers } = require("../controllers/getUser");

const router = Router();

router.get("/user", getUsers);


module.exports = router;