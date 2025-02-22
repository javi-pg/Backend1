const socket = io();
const form = document.getElementById("product-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const product = {
        title: document.getElementById("title").value,
        price: parseFloat(document.getElementById("price").value),
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        stock: parseInt(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        status: true
    };

    socket.emit("newProduct", product);

    form.reset();
});