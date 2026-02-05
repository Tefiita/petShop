class headerComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Calcular ruta relativa a header.html según ubicación del HTML
    const currentPath = window.location.pathname;
    // Buscar la carpeta 'petShop' en la ruta actual
    const baseIndex = currentPath.indexOf("/petShop/");
    let basePath = "";
    if (baseIndex !== -1) {
      basePath = currentPath.substring(0, baseIndex + "/petShop/".length);
    }
    // Ruta relativa desde la raíz del proyecto
    const headerHtmlPath =
      basePath + "../../../paginas/principales/webComponent/header.html";
    fetch(headerHtmlPath)
      .then((response) => response.text())
      .then((html) => {
        this.innerHTML = `
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            <link rel="stylesheet" href="../../../assets/css/styles.css">
            <!-- IMPORTANTE: Bootstrap JS debe cargarse en el documento principal para funcionalidad de menú hamburguesa y dropdown -->      
          ${html}
        `;
        // Forzar actualización del contador y total del carrito después de inyectar el header
        function actualizarContadorYTotalHeader() {
          const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
          const contador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
          const total = carrito.reduce((acc, producto) => {
            let precio = producto.precio;
            if (typeof precio === "string") {
              precio = parseInt(precio.replace(/\D/g, ""), 10) || 0;
            } else if (typeof precio === "number") {
              precio = precio;
            } else {
              precio = 0;
            }
            return acc + producto.cantidad * precio;
          }, 0);
          if (window.jQuery) {
            window.jQuery("#contadorCarrito").text(contador);
            window.jQuery("#totalCarritoHeader").text(`$${total.toLocaleString()}`);
          }
        }
        if (typeof window.actualizarContador === "function") {
          window.actualizarContador();
        } else {
          actualizarContadorYTotalHeader();
        }
        // Escuchar eventos para actualizar en tiempo real
        window.addEventListener("carritoActualizado", actualizarContadorYTotalHeader);
        window.addEventListener("storage", (e) => {
          if (e.key === "carrito") actualizarContadorYTotalHeader();
        });
      });
  }
}

customElements.define("mi-header", headerComponent);
