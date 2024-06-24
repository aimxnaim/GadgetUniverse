const express = require('express');
const router = express.Router();

const { isAuthenticatedUser } = require('../middlewares/auth');
const { stripeCheckoutSession } = require('../controllers/paymentControllers');


router
    .route('/payment/checkout_sessions')
    .post(isAuthenticatedUser, stripeCheckoutSession);

module.exports = router;