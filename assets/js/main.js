$(document).ready(function () {
  function cargarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  let carrito = cargarCarrito();

  function actualizarContador() {
    $("#contadorCarrito").text(carrito.length);
  }

  actualizarContador();

  // Añadir producto al carrito
  $(document).on("click", ".botonAñadir", function () {
    const $producto = $(this).closest(".card");
    const titulo = $producto.find(".card-title").text().trim();
    const precio = $producto.find(".card-text").text().trim();
    const imagen = $producto.find("img").attr("src");

    const nuevoProducto = { titulo, precio, imagen };
    carrito.push(nuevoProducto);
    guardarCarrito(carrito);
    actualizarContador();
  });

  $("#seguirComprando").on("click", () => {
    window.history.go(-1);
  });

  if ($("#productosCarrito").length) {
    renderizarCarrito();
  }

  function renderizarCarrito() {
    const $contenedor = $("#contenedorCarrito");
    $contenedor.empty();
    if (carrito.length === 0) {
      $contenedor.html("<span>No hay productos en el carrito</span>");
      $("#totalCarrito").text("Total: $0");
      return;
    }
    let total = 0;
    carrito.forEach((producto, index) => {
      const numero = parseInt(producto.precio.replace(/\D/g, "") || 0);
      total += numero;
      const $productoHTML = $(`
        <div class="row mb-3 align-items-center rounded p-2">
          <div class="col-2"><img src="${producto.imagen}" class="img-fluid rounded p-2"></div>
          <div class="col-6"><h5 class="mb-0">${producto.titulo}</h5></div>
          <div class="col-2 text-end"><strong>${producto.precio}</strong></div>
          <div class="col-2 text-end"><button class="btn btn-danger btn-sm botonEliminar" data-index="${index}">Eliminar</button></div>
        </div>
      `);
      $contenedor.append($productoHTML);
    });
    $("#totalCarrito").text(`Total: $${total.toLocaleString()}`);
  }

  $(document).on("click", ".botonEliminar", function () {
    const index = $(this).data("index");
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    actualizarContador();
    renderizarCarrito();
  });

  if (document.getElementById("carouselProductos")) {
    const productos = [
      {
        nombre: "Bravery Arenque 12kg Adulto",
        precio: 60000,
        imagen: "./assets/img/arenque 12 adulto.jpg",
      },
      {
        nombre: "Bravery Arenque 12kg Senior",
        precio: 12000,
        imagen: "./assets/img/arenque 12 senior.jpg",
      },
      {
        nombre: "Bravery Arenque 2kg Adulto Pequeño",
        precio: 12000,
        imagen: "./assets/img/arenque 2 adulto pequeño.jpg",
      },
      {
        nombre: "Bravery Pollo 12kg Adulto",
        precio: 58000,
        imagen: "./assets/img/pollo 12 adulto.jpg",
      },
      {
        nombre: "Bravery Cordero 2kg Adulto",
        precio: 13000,
        imagen: "./assets/img/cordero 2 adulto.jpg",
      },
    ];
    const destacados = productos.sort(() => Math.random() - 0.5).slice(0, 3);
    const carousel = document.getElementById("carouselProductos");
    destacados.forEach((prod, idx) => {
      carousel.innerHTML += `
        <div class="carousel-item${idx === 0 ? " active" : ""}">
          <div class='d-flex justify-content-center'>
            <div class="card" style="width: 22rem;">
              <img src="${prod.imagen}" class="card-img-top" alt="${
        prod.nombre
      }">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">$${prod.precio.toLocaleString()}</p>
                <button class="btn btn-primary mt-auto botonAñadir">Agregar al Carro</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
});
