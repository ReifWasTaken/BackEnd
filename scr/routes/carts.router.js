import express from "express";
import cartsManager from "../cartManager.js"
import classProducts from "../productManager.js";
const cartsRouter = express.Router();
const cartManager = new cartsManager();
const productManager = new classProducts();


cartsRouter.post("/", async (req, res)=>{
    try{
        const newCreation = await cartManager.newCart();
        
        return res.status(201).json({
            status: "success",
            msg: "cart created",
            data: newCreation,
        });
    }
    catch(err){
        return res.status(400).json({
            status:"error",
            msg: "cart can not be created",
        });
    }
})

cartsRouter.get("/:cid", async (req, res)=>{
    try{
        const solicitedID = req.params.cid;
        const cartFound = await cartManager.getCartById(parseInt(solicitedID));

          if(cartFound){
           
            return res.status(201).json({
              status: "success",
              msg: "Cart updated succesfuly",
              data: cartFound,
            })
          }
      
        }
        catch{
          return  res.status(404).json({
            status: "error",
            msg: "Cart does not exist",
          });
        }
    
})

cartsRouter.post("/:cid/product/:pid", async (req, res)=>{
    try{
      const cartFound = await cartManager.getCart();
      const productFound = await productManager.getProducts();
      
      
        const solicitedCartID = parseInt(req.params.cid);
        const solicitedProductID = parseInt(req.params.pid);

        const carrito = cartFound.find(e => e.id === solicitedCartID);
        
        if(!carrito){
          return res.status(404).json({
            status: "error",
            msg: "Cart not found",
          })
        }

        const producto = productFound.find(e => e.id === solicitedProductID);
        
        if(!producto){
          return res.status(404).json({
            status: "error",
            msg: "product not found",
          })
        }
        

        if(carrito && producto){
           await cartManager.updateCart(carrito.id, producto.id);

            return res.status(201).json({
                status: "success",
                msg: "cart updated",
                data: carrito,
            })
        }

    }
    catch(err){
        return  res.status(404).json({
            status: "error",
            msg: "error adding the product to the cart",
          });
    }
});

cartsRouter.get("/:cid/test", async (req, res)=>{
  try{
      const solicitedID = req.params.cid;
      const cartFound = await cartManager.getCartById(parseInt(solicitedID));

        if(cartFound){
         
          return res.status(201).render("carts", cartFound);
        }
    
      }
      catch{
        return  res.status(404).json({
          status: "error",
          msg: "Cart does not exist",
        });
      }
  
})
export {cartsRouter};