const socket = io()

// eliminar producto
const dataForm = document.getElementById("formDelete")
const id = document.getElementById("deleteId")

dataForm.addEventListener("submit", evt => {
    evt.preventDefault()
    Swal.fire({
        title: "Eliminar Producto?",
        text: `Se eliminara el producto con ID: ${id.value}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            socket.emit("deleteProduct", {id: id.value})
        }
    })
})

socket.on("newList", data => {
    if(data.status === "error"){
        Swal.fire({
            title: "Producto no encontrado",
            text: `${data.message}`,
            icon: "error"
        })
        return {status: "error", mesage: "Producto no encontrado    "}
    }

    let list
    data.forEach(({_id, title, code, price, category, description, stock, thumbnail}) => {
        list +=`
        <tr>
            <td>${_id}</td>
            <td>${title}</td>
            <td>${code}</td>
            <td>${price}</td>
            <td>${category}</td>
            <td>${description}</td>
            <td>${stock}</td>
            <td>${thumbnail}</td>
      </tr>`
    })
    
    const listAct = `
        <tr>
            <th scope="col">#id</th>
            <th scope="col">nombre</th>
            <th scope="col">codigo</th>
            <th scope="col">precio</th>
            <th scope="col">categoria</th>
            <th scope="col">descripcion</th>
            <th scope="col">stock</th>
            <th scope="col">imagenes</th>
        </tr>` + list
    document.getElementById("tableProduct").innerHTML = listAct
    Swal.fire({
        title: "Producto Eliminado",
        timer: 8000,
        icon: "success"
    })
})

//Agregar producto
const addForm = document.getElementById("addForm")
const product = document.querySelectorAll("input")
const title = document.getElementById("title")
const price = document.getElementById("price")
const code = document.getElementById("code")
const stock = document.getElementById("stock")
const category = document.getElementById("category")
const description = document.getElementById("description")
const status = document.getElementById("status")
const thumbnail = document.getElementById("thumbnail")


addForm.addEventListener("submit", evt => {
    evt.preventDefault()

    socket.emit("addProduct", {
        title: title.value,
        description: description.value,
        price: parseInt(price.value),
        code: parseInt(code.value),
        stock: parseInt(stock.value),
        category: category.value,
        thumbnail: [thumbnail.value]
    })
})

socket.on("productAdded", (newData) => {
    if(newData.status === "error"){
        Swal.fire({
            title: "No se pudo agregar el producto",
            text: `${newData.message}`,
            icon: "error"
        })
        return {status: "error", message: "No se pudo agregar el producto"}
    }
    let list
    newData.forEach(({_id, title, code, price, category, description, stock, thumbnail}) => {
        list +=`
        <tr>
            <td>${_id}</td>
            <td>${title}</td>
            <td>${code}</td>
            <td>${price}</td>
            <td>${category}</td>
            <td>${description}</td>
            <td>${stock}</td>
            <td>${thumbnail}</td>
        </tr>`
    })
    const listAct = `
        <tr>
            <th scope="col">#id</th>
            <th scope="col">nombre</th>
            <th scope="col">codigo</th>
            <th scope="col">precio</th>
            <th scope="col">categoria</th>
            <th scope="col">descripcion</th>
            <th scope="col">stock</th>
            <th scope="col">imagenes</th>
        </tr>` + list

    document.getElementById("tableProduct").innerHTML = listAct
    Swal.fire({
        title: "Producto Agregado Correctamente",
        timer: 8000,
        icon: "success"
    })
})