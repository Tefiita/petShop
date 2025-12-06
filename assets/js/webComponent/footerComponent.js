class footerComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
      // Usar ruta absoluta para que funcione en todas las páginas
      fetch("/paginas/principales/webComponent/footer.html")
      .then((response) => response.text())
      .then((html) => {
        // Inyecta Bootstrap y tu CSS directamente en el DOM del componente
        this.innerHTML = `
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            <link rel="stylesheet" href="/assets/css/styles.css">
            <!-- IMPORTANTE: Bootstrap JS debe cargarse en el documento principal para funcionalidad de menú hamburguesa y dropdown -->      
          ${html}
        `;
      });
  }
}

customElements.define("mi-footer", footerComponent);
