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
        const solicitedCartID = req.params.cid;
        const cartFound = await cartManager.getCartById(parseInt(solicitedCartID));

        const solicitedProductID = req.params.pid;
        const productFound = await productManager.getProductById(parseInt(solicitedProductID));

        if(!cartFound){
          return res.status(404).json({
            status: "error",
            msg: "Cart not found",
          })
        }
        if(!productFound){
          return res.status(404).json({
            status: "error",
            msg: "product not found",
          })
        }
        

        if(cartFound && productFound){
           await cartManager.updateCart(cartFound.id, productFound.id);

            return res.status(201).json({
                status: "success",
                msg: "cart updated",
                data: cartFound,
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