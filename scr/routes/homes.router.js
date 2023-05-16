import express from "express"
import classProductsHome from "../productManager.js";
const homesRouter = express.Router();
const productManagerhome = new classProductsHome();


homesRouter.get("/", async (req, res) => {
    try{

    const productsFound = await productManagerhome.getProducts();
    
    if(productsFound){
      return res.status(200).render("homes", {products: productsFound});

    }
  }
  
  catch(err){
    return  res.status(404).json({
      status: "error",
      msg: "Product List does not exist",
      data: {},
    });
  }
});


export {homesRouter}