import { log } from 'console';
import fs from 'fs';


class ProductManager{
    constructor(path){
        this.path = path;
    }

    addProduct(product){
        //console.log("addProduct()");
        try {
            let products = this.getAll();
            products.push(product);
            fs.writeFileSync(this.path, JSON.stringify(products));
        } catch (error) {
            console.log("error en addProduct()", error);
        }
    }

    getProductById(id){
        try {
            //console.log("get id " + id);
            const products = this.getAll();
            //console.log(products);
            const product = products.find((p) => p.id === Number(id));
            if(!product) throw new Error("Product ID not found");
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    getAll(){
        if (!fs.existsSync(this.path)) return [];
        //console.log("getAll()");
        try {
            const content = fs.readFileSync(this.path, 'utf-8');
            //console.log(content)
            
            if(content && content.trim().length > 0){
                return JSON.parse(content);
            }

            return [];

        } catch (error) {
            console.log("error en getAll()", error);
        }   
    }

    updateProduct(id, body){
        try {
            const products = this.getAll();
            const index = products.findIndex((p) => p.id === Number(id));
            if(index === null) throw new Error("Product ID not found");
            //console.log(body);
            products[index] = { id , ...body};
            //console.log(products);
            fs.writeFileSync(this.path, "");
            fs.writeFileSync(this.path, JSON.stringify(products));
            
            return products[index];
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct(id){
        try {
            const products = this.getAll();
            const index = products.findIndex((p) => p.id === Number(id));
            console.log("index at: ", index);
            if(index === null) throw new Error("Product ID not found");
            
            products.splice(index, 1);
            console.log(products);
            
            fs.writeFileSync(this.path, "");
            fs.writeFileSync(this.path, JSON.stringify(products));
            return products[index];
        } catch (error) {
            console.log(error);
        }
    }
}

export const productManager = new ProductManager("./products.json");