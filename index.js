/*
Entrega N° 1
Desarrollar un servidor que contenga los endpoints y servicios
necesarios para gestionar los productos y carritos de compra para tu API.
*/

import express from 'express';
import { productManager } from "./Managers/productManager.js";
import { cartManager } from './Managers/cartManager.js'; 

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


/*
----------------------------------------------------
-------------------  PRODUCTS  ---------------------
----------------------------------------------------
*/

app.get('/api/products', (req, res) => {
    
     try {
        let products = productManager.getAll();
        res.status(200).send(JSON.stringify(products));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});


app.get('/api/products/:pid', (req, res) => {
    
     try {
        let {pid} = req.params;
        let product = productManager.getProductById(pid);
        
        res.status(200).send(JSON.stringify(product));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});


app.post("/api/products", (req, res) => {
    
    try {
        let products = productManager.getAll();
        const id = (products.length > 0 ) ? Number(products[products.length-1].id + 1) : 1;
        const product = { id: id, ...req.body};
        productManager.addProduct(product);
        res.status(200).send(JSON.stringify(product));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});


app.put('/api/products/:pid', (req, res) => {
    try {
        const product = productManager.updateProduct(Number(req.params.pid), req.body);
        res.status(200).send(JSON.stringify(product));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});


app.delete('/api/products/:pid', (req, res) => {
    try {
        const deleted = productManager.deleteProduct(req.params.pid);
        res.status(200).send(JSON.stringify(deleted));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});



/*
----------------------------------------------------
--------------------  CARTS  -----------------------
----------------------------------------------------
*/


app.post('/api/carts/', (req, res) => {
    try {
        const cart = cartManager.addCart(req.body);
        res.status(200).send(JSON.stringify(cart));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});

app.get('/api/carts/:cid', (req, res) => {
    try {
        let cart = cartManager.getCartByID(Number(req.params.cid));
        res.status(200).send(JSON.stringify(cart));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
    try {
        const cart = cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
        res.status(200).send(JSON.stringify(cart));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


