const express = require('express');
const router = express.Router();

let cart = [];

router.get('/cart', (req, res) => {
    res.json(cart);
});

router.post('/cart', (req, res) => {
    const { item } = req.body;
    const existingItem = cart.find(i => i.id === item.id && i.size === item.size);

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push({ ...item });
    }
    res.json(cart);
});

router.put('/cart/:id', (req, res) => {
    const { id } = req.params;
    const { numbers, cover } = req.body; 
    const item = cart.find(i => i.id === parseInt(id, 10));

    if (item) {
        item.numbers = numbers;
        item.cover = cover;
        item.totalPrice = item.price * numbers * cover; 
        res.json({ message: 'Кількість numbers та cover оновлена', cart });
    } else {
        res.status(404).json({ message: 'Товар не знайдено в кошику' });
    }
});

router.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    cart = cart.filter(i => i.id !== parseInt(id, 10));
    res.json(cart);
});

module.exports = router;