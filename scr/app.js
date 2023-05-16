import express from "express"
import { productsRouter }  from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js";
import { socketsRouter } from "./routes/sockets.router.js"
import { homesRouter } from "./routes/homes.router.js"
import path from "path";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/sockets", socketsRouter);
app.use("/home", homesRouter)

const httpServer = app.listen(port, () => {
  console.log(`app listening from http://localhost:${port}/api/products`)
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket)=>{
  console.log("socket conected to " + socket.id);
})

app.get("*", (req, res)=>{

    res.status(404).json({
      status: "error",
      msg: "route does not exist",
      data: {},
    });
})