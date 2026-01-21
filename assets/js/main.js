$(document).ready(function () {
  // Insertar mapa solo en la página 'nosotros.html'
  if (window.location.pathname.includes("nosotros.html")) {
    // Dirección a buscar
    const direccion = "Schleyer 225, 3790083 Chillán, Ñuble, Chile";
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`,
    )
      .then((resoult) => resoult.json())
      .then((data) => {
        if (data.length > 0) {
          const lat = data[0].lat;
          const lon = data[0].lon;
          // Mostrar mapa con Leaflet
          const map = L.map("map").setView([lat, lon], 15);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          }).addTo(map);
          L.marker([lat, lon]).addTo(map).bindPopup(direccion).openPopup();
        } else {
          alert("Dirección no encontrada");
        }
      });
  }
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
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contador = carrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0,
    );

    const total = carrito.reduce(
      (acc, producto) =>
        acc +
        producto.cantidad * parseInt(producto.precio.replace(/\D/g, ""), 10),
      0,
    );

    $("#contadorCarrito").text(contador);
    $("#totalCarritoHeader").text(`$${total.toLocaleString()}`);
  }

  actualizarContador();

  // Añadir producto al carrito
  $(document).on("click", ".botonAñadir", function () {
    let id, nombreProducto, precio, imagen, sabor;
    let cantidad = 1;
    // Siempre tomar los datos desde el card más cercano al botón
    const $producto = $(this).closest(".card");
    id = $producto.find("p[data-id]").data("id") || $(this).data("id");
    nombreProducto = $producto.find(".card-title").text().trim();
    precio = $producto.find(".card-text").last().text().trim();
    imagen = $producto.find("img").attr("src");
    sabor = $producto.find(".card-text").first().text().trim();

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
        // Rutas para ambas imágenes
        const imgPath = `/petShop/assets/img/alimento-perro/poema/${producto.img}.png`;
        const img2Path = producto.img2
          ? `/petShop/assets/img/alimento-perro/poema/${producto.img2}.png`
          : imgPath;
        const tarjeta = `
            <div class="col-md-3 mb-3"> 
              <div class="card h-100">
                <a href="productoPerro.html?id=${producto.id}">
                  <div class="card-img-hover-wrapper">
                    <img src="${imgPath}" class="card-img-top card-img-main" alt="${producto.nombreProducto}">
                    <img src="${img2Path}" class="card-img-top card-img-hover" alt="${producto.nombreProducto} alternativo">
                  </div>
                </a>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title" style="font-size: 1rem;"><strong>${producto.nombreProducto}</strong></h5> 
                  <p class="card-text"  style="font-size: 0.95rem;">${producto.sabor}</p>
                  <p class="card-text" style="font-size: 1.25rem; color: var(--verde-marca);"><strong>$${producto.precio.toLocaleString()}</strong></p>
                  <p data-id="${producto.id}"></p>
                  <button class="botonAñadir btn btn-success mt-auto">Agregar al Carro</button>
                </div>
              </div>
            </div>
          `;
        $contenedor.append(tarjeta);
      });
      // Agregar CSS para el hover dinámicamente si no existe
      if (!document.getElementById("card-img-hover-style")) {
        const style = document.createElement("style");
        style.id = "card-img-hover-style";
        style.innerHTML = `
          .card-img-hover-wrapper {
            position: relative;
            width: 100%;
            height: 220px;
            min-height: 220px;
            max-height: 220px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            overflow: hidden;
          }
          .card-img-hover-wrapper img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: opacity 0.3s;
            background: #fff;
          }
          .card-img-main { opacity: 1; z-index: 1; }
          .card-img-hover { opacity: 0; z-index: 2; }
          .card-img-hover-wrapper:hover .card-img-main { opacity: 0; }
          .card-img-hover-wrapper:hover .card-img-hover { opacity: 1; }
        `;
        document.head.appendChild(style);
      }
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
      $("#totalCarritoPagina").html(`
        <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
          <h5 class="mb-0">Total:</h5>
          <h5 class="fw-bold text-primary">$${total.toLocaleString()}</h5>
        </div>
      `);

      return;
    }

    let total = 0;
    carrito.forEach((producto, index) => {
      const subtotal =
        parseInt(producto.precio.replace(/\D/g, "") || 0) *
        (producto.cantidad || 1);
      total += subtotal;
      const $productoHTML = $(`
      <div class="row align-items-center p-3 mb-3 carrito-item">

        <div class="col-2 d-flex justify-content-center">
          <img 
            src="${producto.imagen}" 
            class="img-fluid"
            style="max-height: 80px; object-fit: contain;"
          >
        </div>

        <div class="col-4">
          <h6 class="mb-1 fw-semibold text-dark">
            ${producto.nombreProducto}
          </h6>
          <small class="text-muted">${producto.sabor}</small>
        </div>

        <div class="col-auto">
          <div class="d-flex align-items-center gap-2 w-auto cantidad-wrapper">
            <button class="btn-cantidad botonDisminuir" data-index="${index}">−</button>
            <span class="carrito-cantidad">${producto.cantidad}</span>
            <button class="btn-cantidad botonAumentar" data-index="${index}">+</button>
          </div>
        </div>

        <div class="col-3 text-end">
          <div class="carrito-precio">
            ${producto.precio.toLocaleString()}
          </div>
        <div class="carrito-subtotal">
          Subtotal: $${subtotal.toLocaleString()}
        </div>

        </div>

        <div class="col-1 text-end">
          <button class="btn-eliminar botonEliminar" data-index="${index}" title="Eliminar producto">
          🗑️
          </button>

        </div>
      </div>
      `);
      $contenedor.append($productoHTML);
    });
    $("#totalCarritoPagina").html(`
      <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
        <h5 class="mb-0">Total:</h5>
        <h5 class="fw-bold" style="color: var(--gris-oscuro);">$${total.toLocaleString()}</h5>
      </div>
    `);
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

  //Boton enviar compra
  $("#btnFinalizarCompra").on("click", function () {
    if (!carrito.length) {
      alert("El carrito está vacío.");
      return;
    }

    if (!confirm("¿Deseas finalizar la compra y enviarla por WhatsApp?")) {
      return;
    }
    let total = 0;
    let productosTexto = carrito
      .map((producto) => {
        const subtotal =
          parseInt(producto.precio.replace(/\D/g, "") || 0) *
          (producto.cantidad || 1);
        total += subtotal;
        return `• ${producto.nombreProducto} (x${producto.cantidad})  $${subtotal.toLocaleString("es-CL")}`;
      })
      .join("\n");
    const mensaje =
      `🐾 *Nueva solicitud de compra*\n` +
      `────────────────────\n\n` +
      productosTexto +
      `\n\n────────────────────\n` +
      `💰 *Total:* $${total.toLocaleString("es-CL")}\n\n` +
      `📍 *Retiro / despacho:* A coordinar\n` +
      `💬 *Forma de pago:* A convenir\n\n` +
      `Gracias 😊`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://api.whatsapp.com/send?phone=56957778975&text=${mensajeCodificado}`;
    window.open(url, "_blank");
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
        const imgPath = `/petShop/assets/img/alimento-perro/poema/${producto.img}.png`;
        carousel.innerHTML += `
            <div class="carousel-item${idx === 0 ? " active" : ""}">
              <div class='d-flex justify-content-center'>
                <div class="card" style="width: 22rem;">
                  <img src="${imgPath}" class="card-img-top" alt="${
                    producto.nombreProducto
                  }">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title" style="font-size: 1rem;"><strong>${producto.nombreProducto}</strong></h5> 
                  <p class="card-text"  style="font-size: 0.95rem;">${producto.sabor}</p>
                  <p class="card-text" style="font-size: 1.25rem; color: var(--verde-marca);"><strong>$${producto.precio.toLocaleString()}</strong></p>
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
