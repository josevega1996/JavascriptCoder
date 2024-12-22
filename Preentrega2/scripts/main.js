class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

const productosDisponibles = [
  { nombre: "Coca Cola", precio: 5000 },
  { nombre: "Sprite", precio: 2000 },
  { nombre: "Empanada", precio: 1500 },
  { nombre: "Helado", precio: 1200 },
  { nombre: "Arepas", precio: 6000 },
];

const carrito = [];
function agregarProducto() {
  let continuar = true;
  while (continuar) {
    const consola = prompt("Ingrese el producto que desea agregar o escriba salir para finalizar la compra ");

    if (consola.toLowerCase() === "salir") {
      continuar = false;
      console.log("Compra finalizada");
      break;
    }
    const buscaProducto = productosDisponibles.find(
      (Producto) => Producto.nombre.toLowerCase() === consola.toLowerCase().trim()
    );
    if (!buscaProducto){
      console.log("El producto no se encuentra en el inventario");
      break;
    }
    else{
      const nuevoProducto = new Producto(buscaProducto.nombre, buscaProducto.precio);
      carrito.push(nuevoProducto);
      console.log(carrito.length);
      // consola.log(carrito[0]);
    }

  }
  mostrarcarritoDOM();

}

function mostrarcarritoDOM(){
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";

  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - ${producto.precio}`;
    listaCarrito.appendChild(li);

  });

  const total = document.getElementById("total");
  total.textContent = `Total: ${calcularTotal()}`;

}

console.log(carrito)
function calcularTotal(){
  let total = 0 ; 
  for (let i = 0; i < carrito.length; i++){
    total += carrito[i].precio;
  }
  return total;
}