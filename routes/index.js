const express = require('express');

const router = express.Router();

const customersController = require('../controllers/customerController');
const productsController = require('../controllers/productController');
const ordersController = require('../controllers/ordersController');

module.exports = function(){

    //CUSTOMER
    //buscar
    //get: /customers/:id
    router.get('/customers/:id', customersController.show);
    //post: /customers
    router.post('/customers', customersController.add);
    // get : /customers
    router.get('/customers', customersController.list);
    //update
    //put: /customers/:id
    router.put('/customers/:id', customersController.update);
    //delete
    //delete : /customers/:id
    router.delete('/customers/:id', customersController.delete);

    //PRODUCTS
     //buscar
    //get: /products/:id
    router.get('/products/:id', productsController.show);
    router.get('/products/search/:query', productsController.search);
    //post: /products
    router.post('/products', productsController.fileUpload, productsController.add);
    // get : /products
    router.get('/products', productsController.list);
    //update
    //put: /products/:id
    router.put('/products/:id', productsController.fileUpload, productsController.update);
    //delete
    //delete : /products/:id
    router.delete('/products/:id', productsController.delete);

    //post: /orders
    router.post('/orders', ordersController.add);
    // get : /orders
    router.get('/orders/customer/:id', ordersController.findByCustomer);
    router.get('/orders', ordersController.list);
    router.get('/orders/:id', ordersController.show);
    router.put('/orders/:id', ordersController.update);
    router.delete('/orders/:id', ordersController.delete);
    
    return router;
};
