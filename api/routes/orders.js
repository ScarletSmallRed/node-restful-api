const express = require('express');
const router = express.Router();
const ordersController = require("./../controllers/orders")
const checkAuth = require("./../middlewares/check-auth")

router.get("/", checkAuth, ordersController.orders_get_all);

router.get("/:orderId", checkAuth, ordersController.orders_get_order);

router.post("/", checkAuth, ordersController.orders_create_order);

router.delete("/:orderId", checkAuth,  ordersController.orders_delete_order);

module.exports = router;