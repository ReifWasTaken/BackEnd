import express from "express"
import classRealTimeProducts from "../productManager.js";
const realTimeProductsRouter = express.Router();
const realTimeProductsManager = new classRealTimeProducts();


realTimeProductsRouter.get("/", async (req, res) => {
    try{
    const productsFound = await realTimeProductsManager.getProducts();
    if(productsFound){
      return res.status(200).render("realTimeProducts", {products: productsFound});
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

realTimeProductsRouter.post("/", async (req, res)=>{
    try{
    const allProducts = await realTimeProductsManager.getProducts();
    const newProduct =  req.body;
      
    const serchCode = allProducts.find((prod) => prod.code === newProduct.code);
  
      if(serchCode){
        return res.status(400).json({
          status: "error",
          msg: "add an ID is forviden"
        });
      }
  
      if(
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.thumbnail ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.category){
  
          return res.status(400).json({
          status: "error",
          msg: "some data is missing"
          });
      }
  
    await realTimeProductsManager.addProduct({...newProduct, status: true});
    
    return res.status(201).json({
      status: "succes",
      msg: "producct added succesfully",
      data: newProduct,
    });
  }
  
  catch(err){
    return res.status(400).json({
      status: "error",
      msg: "there was an error adding the product",
      data: err
    })
  }
  });


export {realTimeProductsRouter}
