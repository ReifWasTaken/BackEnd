import express from "express"
import classProducts from "../productManager.js";
const productsRouter = express.Router();
const productManager = new classProducts();


productsRouter.get("/", async (req, res) => {
  try{
    const limit = req.query.limit;
  const products = await productManager.getProducts();
  
  if(limit){
    return res.status(200).json({
    status: "success",
    msg: "Product List",
    data: (products.slice(0, limit))
    });
  }else{
    return res.status(200).json({
    status: "success",
    msg: "Product List",
    data: products,
    });
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

productsRouter.post("/", async (req, res)=>{
  try{
  const allProducts = await productManager.getProducts();
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

  await productManager.addProduct({...newProduct, status: true});
  
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

productsRouter.get("/:pid", async (req, res) => {
  try{
  const solicitedID = req.params.pid; 
  const productFound = await productManager.getProductById(parseInt(solicitedID));

  if(productFound){     
    return res.status(200).json({
    status: "success",
    msg: "Product info",
    data: productFound,
    });  
  }

}

catch(err){   
  return  res.status(404).json({
    status: "error",
    msg: "Product does not exist",
  });
}

});

productsRouter.put("/:pid", async (req, res)=>{
  try{
    const solicitedID = req.params.pid; 
    const productFound = await productManager.getProductById(parseInt(solicitedID));

    const newProduct =  req.body;

    if(newProduct.id){
      return  res.status(404).json({
        status: "error",
        msg: "Product's ID cant be updated",
      });

    }
    if(productFound){
      await productManager.updateProduct(productFound.id, newProduct);
      
      return res.status(201).json({
        status: "success",
        msg: "product updated succesfuly",
        data: productFound
      })
    }

  }
  catch{
    return  res.status(404).json({
      status: "error",
      msg: "Product does not exist",
    });
  }
})

productsRouter.delete("/:pid", async (req, res)=> {
  try{
    const solicitedID = req.params.pid; 
    const productFound = await productManager.deleteProduct(parseInt(solicitedID))

    if(!productFound){
      return  res.status(404).json({
        status: "error",
        msg: "Product does not exist",
      });

    }
    return res.status(200).json({
      status: "success",
      msg: "the products has been deleted",
      data: productFound,
    });
  
      
  }
  catch(err){
    return  res.status(404).json({
      status: "error",
      msg: "Product does not exist",
    })};
  })

productsRouter.get("/:pid/test", async (req, res) => {
  try{
  const solicitedID = req.params.pid; 
  const productFound = await productManager.getProductById(parseInt(solicitedID));

  if(productFound){     
    return res.status(200).render("products", productFound);

}
  }

catch(err){   
  return  res.status(404).json({
    status: "error",
    msg: "Product does not exist",
  });
}

});

export {productsRouter};