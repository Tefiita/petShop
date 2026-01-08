class footerComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
      // Usar ruta absoluta para que funcione en todas las páginas
        // Calcular ruta relativa a footer.html según ubicación del HTML
        const currentPath = window.location.pathname;
        const baseIndex = currentPath.indexOf('/petShop/');
        let basePath = '';
        if (baseIndex !== -1) {
          basePath = currentPath.substring(0, baseIndex + '/petShop/'.length);
        }
        const footerHtmlPath = basePath + 'paginas/principales/webComponent/footer.html';
        fetch(footerHtmlPath)
      .then((response) => response.text())
      .then((html) => {
        // Inyecta Bootstrap y tu CSS directamente en el DOM del componente
        this.innerHTML = `
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            <link rel="stylesheet" href="../../../assets/css/styles.css">
            <!-- IMPORTANTE: Bootstrap JS debe cargarse en el documento principal para funcionalidad de menú hamburguesa y dropdown -->      
          ${html}
        `;
      });
  }
}

customElements.define("mi-footer", footerComponent);
