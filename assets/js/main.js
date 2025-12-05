$(document).ready(function () {
  function cargarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }

  //se guarda el carrito en localStorage
  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  let carrito = cargarCarrito();

  //actualizar contador del carrito
  function actualizarContador() {
    $("#contadorCarrito").text(carrito.length);
  }

  actualizarContador();

  // Añadir producto al carrito
  $(document).on("click", ".botonAñadir", function () {
    const $producto = $(this).closest(".card");
    const nombreProducto = $producto.find(".card-title").text().trim();
    const precio = $producto.find(".card-text").last().text().trim();
    const imagen = $producto.find("img").attr("src");
    const id = $producto.data("id");
    const sabor = $producto.find(".card-text").first().text().trim();

    const cantidad = 1;

    const existe = carrito.find((p) => p.id == id);
    if (existe) {
      existe.cantidad ++;
      guardarCarrito(carrito);
      actualizarContador();
      return;
    }
    //nuevo producto
    const nuevoProducto = { nombreProducto, precio, imagen, sabor, id, cantidad };
    carrito.push(nuevoProducto);
    guardarCarrito(carrito);
    actualizarContador();
  });

  // Mostrar productos Poema desde el JSON en cards
  if (document.getElementById("contenedorProductos")) {
    $.getJSON(
      "./assets/productos/alimento-perro/bdd-poema1.json",
      function (productos) {
        const $contenedor = $("#contenedorProductos");
        productos.forEach((producto) => {
          const imgPath = `./assets/img/alimento-perro/poema/${producto.img}.png`;
          const tarjeta = `
            <div class="col-md-3 mb-3"> 
              <div class="card h-100">
                <img src="${imgPath}" class="card-img-top" alt="${producto.nombreProducto}">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${producto.nombreProducto}</h5>
                  <p class="card-text">${producto.sabor}</p>
                  <p class="card-text">$${producto.precio.toLocaleString()}</p>
                  <button class="botonAñadir btn btn-success mt-auto">Agregar al Carro</button>
                </div>
              </div>
            </div>
          `;
          $contenedor.append(tarjeta);
        });
      }
    );
  }
  $("#seguirComprando").on("click", () => {
    window.history.go(-1);
  });

  // ver cantidad de productos en el carrito y renderizar en la pagina carrito.html
  if ($("#productosCarrito").length) {
    renderizarCarrito();
  }

  // Renderizar productos en el carrito
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
          <div class="col-2">
            <img src="${producto.imagen}" class="img-fluid rounded p-2">
          </div>
          <div class="col-5" >
            <h5 class="mb-0">${producto.nombreProducto}</h5>
            <span>${producto.sabor}</span>
          </div>
          <div class="col-1 d-flex justify-content-end">
            <span>${producto.cantidad}</span>
          </div>
          <div class="col-2 text-end">
            <strong>${producto.precio.toLocaleString()}</strong>
          </div>
          <div class="col-2 text-end">
            <button class="btn btn-danger btn-sm botonEliminar" data-index="${index}">Eliminar</button>
          </div>
        </div>
      `);
      $contenedor.append($productoHTML);
    });
    $("#totalCarrito").text(`Total: $${total.toLocaleString()}`);
  }

  //eliminar producto del carrito
  $(document).on("click", ".botonEliminar", function () {
    const index = $(this).data("index");
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    actualizarContador();
    renderizarCarrito();
  });

  //carrusel productos en index.html
  if (document.getElementById("carouselProductos")) {
    $.getJSON(
      "./assets/productos/alimento-perro/bdd-poema1.json",
      function (productos) {
        const destacados = productos
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        const carousel = document.getElementById("carouselProductos");
        carousel.innerHTML = "";
        destacados.forEach((producto, idx) => {
          const imgPath = `./assets/img/alimento-perro/poema/${producto.img}.png`;
          carousel.innerHTML += `
            <div class="carousel-item${idx === 0 ? " active" : ""}">
              <div class='d-flex justify-content-center'>
                <div class="card" style="width: 22rem;">
                  <img src="${imgPath}" class="card-img-top" alt="${
            producto.nombreProducto
          }">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombreProducto}</h5>
                    <p class="card-text">${producto.sabor}</p>
                    <p class="card-text">${producto.precio.toLocaleString()}</p>
                    <button class="btn btn-success mt-auto botonAñadir">Agregar al Carro</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      }
    );
  }
});
