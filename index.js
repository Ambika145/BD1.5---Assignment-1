const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint 1: Calculate Cart Total
app.get('/cart-total', (req, res) => {
    let newItemPrice = parseFloat(req.query.newItemPrice);
    let cartTotal = parseFloat(req.query.cartTotal);
    let totalCartValue = cartTotal + newItemPrice;
    res.send(totalCartValue.toString());
});

// Endpoint 2: Apply Membership Discount
app.get('/membership-discount', (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal);
    let isMember = req.query.isMember === 'true';
    let finalPrice = isMember ? cartTotal * 0.9 : cartTotal;
    res.send(finalPrice.toString());
});

// Endpoint 3: Calculate Tax (5% of cart total)
app.get('/calculate-tax', (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal);
    let taxAmount = cartTotal * 0.05;
    res.send(taxAmount.toString());
});

// Endpoint 4: Estimate Delivery Time
app.get('/estimate-delivery', (req, res) => {
    let shippingMethod = req.query.shippingMethod;
    let distance = parseFloat(req.query.distance);
    let days = shippingMethod.toLowerCase() === 'express' ? Math.ceil(distance / 100) : Math.ceil(distance / 50);
    res.send(days.toString());
});

// Endpoint 5: Calculate Shipping Cost
app.get('/shipping-cost', (req, res) => {
    let weight = parseFloat(req.query.weight);
    let distance = parseFloat(req.query.distance);
    let shippingCost = weight * distance * 0.1;
    res.send(shippingCost.toString());
});

// Endpoint 6: Calculate Loyalty Points (2 points per $1 spent)
app.get('/loyalty-points', (req, res) => {
    let purchaseAmount = parseFloat(req.query.purchaseAmount);
    let loyaltyPoints = purchaseAmount * 2;
    res.send(loyaltyPoints.toString());
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
