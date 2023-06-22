const fs = require("fs")

class ProductManager{
    constructor(path){
    this.path = path;
    this.products = [];
    }

    static id = 0;

    addProduct = async(objeto) => {
        
        ProductManager.id++
        const newProduct ={
            title: objeto.title,
            description: objeto.drescription,
            price: objeto.price,
            thumbnail: objeto.thumbnail,
            code: objeto.code,
            stock: objeto.stock,
            id: ProductManager.id
        };

        this.products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        
    }

    readProducts = async() => {                                     //retorna datos
    let reading = await fs.promises.readFile(this.path, "utf-8")
    return JSON.parse(reading)
    }


    getProducts = async () => {                                 //Impresión
        let currentProducts = await this.readProducts();
        return console.log (currentProducts)
    }

    getProductsById = async(id) => {
        let idSearch = await this.readProducts();
        if (!idSearch.find(product => product.id == id)){
            console.log("Producto inexistente, por favor verifique el id");
            return "Producto inexistente, por favor verifique el id";
        }else{
        console.log(idSearch.find(product => product.id == id));
        return (idSearch.find(product => product.id == id))
    }
}


    deleteProductsById = async(id) =>{
    let reading = await this.readProducts();
    let productFilter = reading.filter(products => products.id != id);
    await fs.promises.writeFile(this.path, JSON.stringify(productFilter));
    console.log(`El producto con id ${id} ha sido actualizado`)
    }   


    updateProducts = async({id, ...products}) => {
    await this.deleteProductsById(id);
    let currentProduct = await this.readProducts();
    console.log(currentProduct)
    let productUpdate = [{ id, ...products},...currentProduct];
    await fs.promises.writeFile(this.path, JSON.stringify(productUpdate))
    }


}





module.exports = ProductManager;