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
            if(!product) throw new Error("Product with ID not found");
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
}

export const productManager = new ProductManager("./products.json");