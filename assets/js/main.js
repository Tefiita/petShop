$(document).ready(function () {
  //cargar carrito desde localStorage
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
    const contador = carrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    );
    $("#contadorCarrito").text(contador);
  }

  actualizarContador();

  // Añadir producto al carrito
  $(document).on("click", ".botonAñadir", function () {
    let id, nombreProducto, precio, imagen, sabor;
    let cantidad = 1;
    // Si el botón tiene data-id, estamos en una página de producto individual
    if ($(this).data("id")) {
      id = $(this).data("id");
      // Busca el producto en el JSON cargado (si existe en memoria)
      // Si no, toma los datos del DOM
      nombreProducto = $(".card-title").first().text().trim();
      precio = $(".card-text").last().text().trim();
      imagen = $("img").first().attr("src");
      sabor = $(".card-text").first().text().trim();
    } else {
      // Desde la lista de productos
      const $producto = $(this).closest(".card");
      id = $producto.find("p[data-id]").data("id");
      nombreProducto = $producto.find(".card-title").text().trim();
      precio = $producto.find(".card-text").last().text().trim();
      imagen = $producto.find("img").attr("src");
      sabor = $producto.find(".card-text").first().text().trim();
    }

    // Normalizar ID a string para evitar problemas de comparación
    id = String(id);

    // Buscar si ya existe en el carrito por ID
    const existe = carrito.find((p) => String(p.id) === id);
    if (existe) {
      existe.cantidad++;
      guardarCarrito(carrito);
      actualizarContador();
      return;
    } else {
      const nuevoProducto = {
        nombreProducto,
        precio,
        imagen,
        sabor,
        id,
        cantidad,
      };
      carrito.push(nuevoProducto);
      guardarCarrito(carrito);
      actualizarContador();
    }
  });

  // Mostrar productos Poema desde el JSON en cards
  if (document.getElementById("contenedorProductos")) {
    // Usar ruta absoluta comprobada en el navegador
    var jsonPath = "/petShop/assets/bdd/alimento-perro/bdd-poema1.json";
    $.getJSON(jsonPath, function (productos) {
      const $contenedor = $("#contenedorProductos");
      productos.forEach((producto) => {
        // Ruta dinámica absoluta para imágenes
        const imgPath = `/petShop/assets/img/alimento-perro/poema/${producto.img}.png`;
        const tarjeta = `
            <div class="col-md-3 mb-3"> 
              <div class="card h-100">
                <a href="productoPerro.html?id=${producto.id}"> <!-creacion de enlace a la pagina producto individual-->
                  <img src="${imgPath}" class="card-img-top" alt="${producto.nombreProducto}">
                </a>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${producto.nombreProducto}</h5>
                  <p class="card-text">${producto.sabor}</p>
                  <p class="card-text">$${producto.precio.toLocaleString()}</p>
                  <p class="card-text">${producto.id}</p>
                  <p data-id="${producto.id}"></p>
                  <button class="botonAñadir btn btn-success mt-auto">Agregar al Carro</button>
                </div>
              </div>
            </div>
          `;
        $contenedor.append(tarjeta);
      });
    });
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
      const subtotal =
        parseInt(producto.precio.replace(/\D/g, "") || 0) *
        (producto.cantidad || 1);
      total += subtotal;
      const $productoHTML = $(`
      <div class="row mb-3 align-items-center rounded p-2">
        <div class="col-2">
          <img src="${producto.imagen}" class="img-fluid rounded p-2">
        </div>
        <div class="col-5">
          <h5 class="mb-0">${producto.nombreProducto}</h5>
          <span>${producto.sabor}</span>
        </div>
        <div class="col-2 d-flex justify-content-center align-items-center gap-2">
          <!-- Botón para disminuir cantidad -->
          <button class="btn btn-outline-secondary btn-sm botonDisminuir" data-index="${index}" title="Disminuir cantidad">-</button>
          <span class="fw-bold">${producto.cantidad}</span>
          <!-- Botón para aumentar cantidad -->
          <button class="btn btn-outline-primary btn-sm botonAumentar" data-index="${index}" title="Aumentar cantidad">+</button>
        </div>
        <div class="col-2 text-end">
          <strong>${producto.precio.toLocaleString()}</strong><br>
          <span class="text-muted">Subtotal: $${subtotal.toLocaleString()}</span>
        </div>
        <div class="col-1 text-end">
          <!-- Botón para eliminar producto -->
          <button class="btn btn-danger btn-sm botonEliminar" data-index="${index}" title="Eliminar producto">🗑️</button>
        </div>
      </div>
    `);
      $contenedor.append($productoHTML);
    });
    $("#totalCarrito").text(`Total: $${total.toLocaleString()}`);
  }

  //eliminar un producto del carrito
  $(document).on("click", ".botonEliminar", function () {
    const index = $(this).data("index");
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    actualizarContador();
    renderizarCarrito();
  });

  // Disminuir cantidad
  $(document).on("click", ".botonDisminuir", function () {
    const index = $(this).data("index");
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
      guardarCarrito(carrito);
      actualizarContador();
      renderizarCarrito();
    }
  });

  // Aumentar cantidad
  $(document).on("click", ".botonAumentar", function () {
    const index = $(this).data("index");
    carrito[index].cantidad++;
    guardarCarrito(carrito);
    actualizarContador();
    renderizarCarrito();
  });

  //carrusel productos en index.html
  if (document.getElementById("carouselProductos")) {
    var currentPath = window.location.pathname;
    var baseIndex = currentPath.indexOf("/petShop/");
    var basePath = "";
    if (baseIndex !== -1) {
      basePath = currentPath.substring(0, baseIndex + "/petShop/".length);
    }
    var carouselJsonPath =
      basePath + "assets/bdd/alimento-perro/bdd-poema1.json";
    $.getJSON(carouselJsonPath, function (productos) {
      const destacados = productos.sort(() => Math.random() - 0.5).slice(0, 3);
      const carousel = document.getElementById("carouselProductos");
      carousel.innerHTML = "";
      destacados.forEach((producto, idx) => {
        const imgPath =
          basePath + "assets/img/alimento-perro/poema/" + producto.img + ".png";
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
                    <p data-id="${producto.id}"></p>
                    <button class="btn btn-success mt-auto botonAñadir" data-id="${
                      producto.id
                    }">Agregar al Carro</button>
                  </div>
                </div>
              </div>
            </div>
          `;
      });
    });
  }
});
