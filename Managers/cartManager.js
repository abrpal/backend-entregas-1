import fs from 'fs';
import { productManager } from './productManager.js';

class CartManager{
    constructor(path){
        this.path = path;
    }

    getAllCarts(){
        if (!fs.existsSync(this.path)) return [];
        try {
            const content = fs.readFileSync(this.path, 'utf-8');
                        
            if(content && content.trim().length > 0){
                return JSON.parse(content);
            }
            return [];

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    addCart(body){
        try {
            let carts = this.getAllCarts();
            const id = (carts.length > 0 ) ? Number(carts[carts.length-1].id + 1) : 1;
            const cart = { id: id, ...body};
            carts.push(cart);
            fs.writeFileSync(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    getCartByID(cid){
        try {
            const carts = this.getAllCarts();
            const cart = carts.find((c) => c.id === Number(cid));
            if(!cart) throw new Error("Cart ID not found");
            return cart;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    addProductToCart(cid, pid){
        try {
            let carts = this.getAllCarts();
            let cart = carts.find((c) => c.id === Number(cid));
            if(!cart) throw new Error("Cart ID not found");

            const product = productManager.getProductById(pid);
            if(!product) throw new Error("Product ID not found");

            cart.products.push(String(product.id));
            fs.writeFileSync(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

export const cartManager = new CartManager("./carts.json");