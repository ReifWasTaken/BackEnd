import fs from "fs";


class CartManagment{
    constructor(path){
    this.path = "./scr/cart.json";
}

    async getCart(){
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(data);
            }

            await fs.promises.writeFile(this.path, JSON.stringify([]), null, 2);
            return [];
        }
        catch(err){
            throw new err ("getCart Failed");
        }
    };

    async newCart(cart){
        try{ 
            let data = await this.getCart();

                let id = data.length > 0 ? data[data.length -1].id +1 : 1;
                cart = {id, ...cart, products: []};
                data.push(cart);
                const cartSting = JSON.stringify(data , null, 2)
                await fs.promises.writeFile(this.path, cartSting);

                return cart, "cart Created";
            }
        catch(err){
            throw new Error(err.message);
        }    
    }

    async getCartById(id){
        try{
            let data = await this.getCart();

            let cartFound = data.find((cart)=> cart.id === id);
            // JSON.parse(cartFound);

                if(!cartFound){
                    throw new error ("ID not found");
                }

            return cartFound;     
        }catch(err){
            throw new err ("getCartById failed");
        }

    }
    async updateCart(cartId, productId) {
        try {
            //Cart Info
            const dataCarts = await this.getCart()
            const cart = dataCarts.find(element => element.id == cartId)
            const cartProducts = cart.products

            //products info
            const read = await fs.promises.readFile("./scr/products.json", "utf-8");
            const dataProducts = read ? JSON.parse(read) : [];
            const productFound = Object.assign({}, {id :dataProducts.find(ele => ele.id == productId).id})

            if(cartProducts.find(ele => ele.id == productFound.id)){
                console.log(productFound)
                productFound.quantity ++
                cartProducts.find(ele => ele.id == productFound.id).quantity++
                await fs.promises.writeFile(this.path, JSON.stringify(dataCarts, null, 4), "utf-8");
                return cartProducts
            }
            productFound.quantity = 1
            cart.products.push(productFound)
            await fs.promises.writeFile(this.path, JSON.stringify(dataCarts, null, 4), "utf-8");
            
        }
        catch (err) {
            throw new Error(err, "can not update the cart")
        }
    }


}

export default CartManagment;