const express = require('express');
const router = express.Router();

const { isAuthenticatedUser } = require('../middlewares/auth');
const { stripeCheckoutSession, stripeWebhook } = require('../controllers/paymentControllers');


router
    .route('/payment/checkout_sessions')
    .post(isAuthenticatedUser, stripeCheckoutSession);

router
    .route('/payment/webhook')
    .post(stripeWebhook);

module.exports = router;