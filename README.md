# GolPet Ecommerce

Este proyecto es una tienda online llamada **GolPet**, dedicada a la venta de alimentos, juguetes y accesorios para mascotas. El objetivo es simular un ecommerce moderno, responsivo y fácil de usar, donde los usuarios pueden explorar productos, agregarlos al carrito y ver detalles de cada uno.

## Características principales
- Catálogo de productos para perros y gatos
- Página de detalle para cada producto
- Carrito de compras con contador y persistencia en localStorage
- Navegación intuitiva y diseño responsivo
- Uso de cards, carrusel y componentes visuales de Bootstrap

## Tecnologías empleadas
- **HTML5**: Estructura de las páginas
- **CSS3**: Estilos personalizados y adaptaciones
- **Bootstrap 5**: Framework principal para el diseño responsivo y componentes visuales
- **JavaScript (jQuery)**: Lógica de interacción, manejo del carrito y renderizado dinámico

## Estructura del proyecto
La estructura del proyecto es la siguiente (resumida):

```
petShop/
├── README.md
├── assets/
│   ├── bdd/                # Datos en CSV y JSON
│   ├── css/                # Estilos globales
│   ├── img/                # Imágenes
│   └── js/                 # Lógica principal y componentes
│       ├── main.js
│       ├── producto.js
│       └── webComponent/
├── paginas/
│   ├── alimento-gato/
│   │   └── alimento-gato.html
│   ├── alimentos-perro/
│   │   ├── 7804675350070.html
│   │   ├── alimento-perro.html
│   │   ├── productoPerro.html
│   └── principales/
│       ├── carrito.html
│       ├── index.html
│       ├── nosotros.html
│       └── webComponent/
└── ...
```

## ¿Cómo iniciar el aplicativo?

1. **Clona el repositorio**
	```bash
	git clone <url-del-repositorio>
	```
2. **Abre la carpeta `petShop` en tu editor de código**
3. **Abre el archivo** `paginas/principales/index.html` **en tu navegador**

> **Nota:** No se requiere backend ni instalación de dependencias. Todo funciona en el navegador.

## Detalles adicionales

- Los datos de productos pueden encontrarse en `assets/bdd/` en formato JSON.
- Los componentes reutilizables están en `assets/js/webComponent/` y `paginas/principales/webComponent/`.
- El carrito de compras utiliza `localStorage` para persistencia.
- El diseño es responsivo y utiliza Bootstrap para la mayoría de los componentes visuales.

---
Desarrollado como parte de un bootcamp de Front-end.