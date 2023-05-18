const socket = io();
const formu = document.getElementById(formu)
const title = document.getElementById(title)
const description = document.getElementById(description)
const price = document.getElementById(price)
const thumbnail = document.getElementById(thumbnail)
const code = document.getElementById(code)
const category = document.getElementById(category)
const stock = document.getElementById(stock)

socket.on("all_products", (data)=>{
    //aca recibe la data que se envia
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
    
});
