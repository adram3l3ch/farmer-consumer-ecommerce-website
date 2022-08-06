const express = require("express");
const {
	createProduct,
	getAllProducts,
	getProduct,
	updateProduct,
	checkOut,
	deleteProduct,
	reviewProduct,
} = require("../controllers/product");
const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/:id").get(getProduct).delete(deleteProduct).patch(updateProduct);
router.route("/review/:id").patch(reviewProduct);
router.get("/user/:userId", getAllProducts);
router.post("/checkout", checkOut);

module.exports = router;
