function compra() {
  const productos = [
    { nombre: "Coca Cola", precio: 5000 },
    { nombre: "Sprite", precio: 2000 },
    { nombre: "Empanada", precio: 1500 },
    { nombre: "Helado", precio: 1200 },
    { nombre: "Arepas", precio: 6000 },
  ];

  let total = 0;
  const carrito = [];
  let menu = prompt(
    "Que producto deseas comprar (Ingresa el numero)? ingresa 0 para salir"
  );
  while (menu != 0) {
    const index = parseInt(menu) - 1;
    if (index >= 0 && index < productos.length) {
      const producto = productos[index];
      carrito.push(producto);
      total += producto.precio;
      alert(`Agregaste ${producto.nombre} al carrito`);
    } else {
      alert("Producto no encontrado");
    }
    menu = prompt(
      "Que producto deseas comprar (Ingresa el numero)? ingresa 0 para salir"
    )
    // Vamos a mostra el resultado final en el html
  }
  mostrarCarrito(carrito, total);
}

function mostrarCarrito(carrito, total) {
    // vamos a crear una lista con los productos seleccionados
    alert(JSON.stringify(carrito, null, 2))
    let resumen = "";

    carrito.forEach((producto, index) => {
        resumen += `<li>${producto.nombre}: $${producto.precio}</li>`;
    });
    
    
    resumen += `<h4>Total: $${total}</h4>`;
    
    // Insertar el resumen en el HTML
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = resumen;
  }

