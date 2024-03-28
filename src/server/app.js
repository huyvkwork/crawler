const express = require('express');
const path = require('path');
const ProductService = require('../services/ProductService');

const app = express();
const productService = new ProductService();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    try {
        const products = await productService.getProducts(page, limit);
        const totalProducts = await productService.getTotalProducts();
        const totalPages = Math.ceil(totalProducts / limit);
        res.render('index', { products, page, totalPages, limit });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    } finally {
        await productService.closeConnection();
    }
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
