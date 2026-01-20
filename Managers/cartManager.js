import {fs} from 'fs';

class CartManager{
    constructor(path){
        this.path = path;
    }

    addCart(cart){

    }

    getCartProducts(cid){

    }

    addProductToCart(cid, product){

    }
}

export const cartManager = new CartManager("./carts.json");