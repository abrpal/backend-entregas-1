/*
Entrega N° 1
Desarrollar un servidor que contenga los endpoints y servicios
necesarios para gestionar los productos y carritos de compra para tu API.
*/

import express from 'express';
import { productManager } from "./Managers/productManager.js";

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/", (req, res) => {
    
    try {
        const product = { id: Math.floor(Math.random() * 1000), ...req.body};

        productManager.addProduct(product);
        
        res.status(200).send(JSON.stringify(product));
    } catch (error) {
        console.log(error.message);
        res.status(500).send();
    }
});


app.get('/api/products', (req, res) => {
    
    //res.status(200).json(productos);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


