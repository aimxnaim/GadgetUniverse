const express = require('express');
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder, getSales } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router
    .route('/order/new')
    .post(isAuthenticatedUser, newOrder);

router
    .route('/order/:id')
    .get(isAuthenticatedUser, getSingleOrder);

router
    .route('/me/orders')
    .get(isAuthenticatedUser, myOrders);

router
    .route('/admin/get_sales')
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSales);

router
    .route('/admin/orders')
    .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

router
    .route('/admin/orders/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;