import express from "express";

const socketsRouter = express.Router();

socketsRouter.get("/", (req, res)=>{

    res.render("sockets", {});
})

export {socketsRouter}