const socket = io();
const formu = document.getElementById("formu")
const title = document.getElementById("title")
const description = document.getElementById("description")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")
const code = document.getElementById("code")
const category = document.getElementById("category")
const stock = document.getElementById("stock")


socket.on("error", (error)=> {
    alert(error.msg)
})

socket.on("all_products", (data)=>{
    const product = document.getElementById("product")

    product.innerHTML =  `${data.map(e =>
        
    `
    <ul>
        <h1>Product: ${e.title}</h1>
        <li>ID: ${e.id}</li>
        <li>description:${e.description}</li>
        <li>price:${e.price}</li>
        <li>thumbnail:${e.thumbnail}</li>
        <li>stock: ${e.stock}</li>
        <button id="delete" type="submit" onclick="deleteButton(${e.id})">X</button>
    </ul>`

        ).join("")}`
});

formu.addEventListener("submit", (e)=>{
    e.preventDefault();

    const newProduct = {
        
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        category: category.value,
        stock: stock.value,
    }

    title.value = ""
    description.value = ""
    price.value = ""
    thumbnail.value = ""
    code.value = ""
    category.value = ""
    stock.value = ""

    socket.emit("new_product", newProduct);
});

     deleteButton = (IDProd)=> {

        socket.emit("delete_product", IDProd);
    }
    


