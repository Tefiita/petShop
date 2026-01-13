// 1. Obtener el id de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2. Cargar el JSON
fetch("/petShop/assets/bdd/alimento-perro/bdd-poema1.json")
  .then((res) => res.json())
  .then((productos) => {
    // 3. Buscar el producto por id
    const producto = productos.find((p) => p.id == id);
    if (producto) {
      document.getElementById("nombreProducto").textContent =
        producto.nombreProducto;
      document.getElementById(
        "precio"
      ).textContent = `$${producto.precio.toLocaleString()}`;
      document.getElementById("sabor").textContent = producto.sabor;
      document.getElementById("descripcion").textContent = producto.descripcion;
      document.getElementById("composicion").textContent = producto.composicion;
      document.getElementById("analiticos").innerHTML = producto.analiticos
        .map((item) => `<li>${item}</li>`)
        .join("");
      if (producto.tamañoMascota === "cachorro") {
        let tablaCachorro = document.getElementById(
          "table"
        ).innerHTML = ` <div class="container mt-4">
                          <table class="table table-bordered text-center align-middle">
                            <thead>
                              <tr>
                                <th colspan="4" class="bg-success text-white"><h3><u>Cachorro</u></h3></th>
                              </th>
                              <tr>
                                <th rowspan="2" class="text-center align-middle bg-success text-white">Rango Peso</th>
                                <th colspan="3" class="bg-success text-white">Cantidad Diaria (gr)</th>
                              </tr>
                              <tr>
                                <th class="bg-success text-white">Menos de 3 Meses</th>
                                <th class="bg-success text-white">4 a 9 Meses</th>
                                <th class="bg-success text-white">10 a 12 Meses</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1 Kg</td>
                                <td>55 </td>
                                <td>40 </td>
                                <td>30 </td>
                              </tr>
                              <tr>
                                <td>2 Kg</td>
                                <td>70 </td>
                                <td>65 </td>
                                <td>50 </td>
                              </tr>
                              <tr>
                                <td>5 Kg</td>
                                <td>150 </td>
                                <td>110 </td>
                                <td>100 </td>
                              </tr>
                              <tr>
                                <td>10 Kg</td>
                                <td>220 </td>
                                <td>190 </td>
                                <td>170 </td>
                              </tr>
                              <tr>
                                <td>15 Kg</td>
                                <td>290 </td>
                                <td>260 </td>
                                <td>230 </td>
                              </tr>
                              <tr>
                                <td>20 Kg</td>
                                <td>350 </td>
                                <td>320 </td>
                                <td>278 </td>
                              </tr>
                              <tr>
                                <td>30 Kg</td>
                                <td>460 </td>
                                <td>430 </td>
                                <td>350 </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        `;
      } else if (
        producto.tamañoMascota &&
        producto.tamañoMascota.toLowerCase() === "adulto"
      ) {
        let tablaAdulto = document.getElementById(
          "table"
        ).innerHTML = ` <div class="container mt-4">
                          <table class="table table-bordered text-center align-middle">
                            <thead>
                            <tr>
                              <th colspan="2" class="bg-success text-white"><h3><u>Senior</u></h3></th>
                            </th>
                            </tr>
                              <tr>
                                <th class="text-center align-middle bg-success text-white">Rango Peso</th>
                                <th class="bg-success text-white">Cantidad Diaria (gr)</th>
                              </tr>
                              
                            </thead>
                            <tbody>
                              <tr>
                                <td>1 Kg</td>
                                <td>25</td>

                              </tr>
                              <tr>
                                <td>2.5 Kg</td>
                                <td>55</td>
                              </tr>
                              <tr>
                                <td>5 Kg</td>
                                <td>90</td>
                              </tr>
                              <tr>
                                <td>10 Kg</td>
                                <td>165</td>
                              </tr>
                              <tr>
                                <td>15 Kg</td>
                                <td>230</td>
                              </tr>
                              <tr>
                                <td>20 Kg</td>
                                <td>280</td>
                              </tr>
                              <tr>
                                <td>30 Kg</td>
                                <td>330</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      `;
      } else if (producto.tamañoMascota === "senior") {
        let tablaSenior = document.getElementById(
          "table"
        ).innerHTML = ` <div class="container mt-4">
                          <table class="table table-bordered text-center align-middle">
                            <thead>
                            <tr>
                              <th colspan="2" class="bg-success text-white"><h3><u>Senior</u></h3></th>
                            </th>
                            </tr>
                              <tr>
                                <th class="text-center align-middle bg-success text-white">Rango Peso</th>
                                <th class="bg-success text-white">Cantidad Diaria (gr)</th>
                              </tr>
                              
                            </thead>
                            <tbody>
                              <tr>
                                <td>1 Kg</td>
                                <td>30</td>

                              </tr>
                              <tr>
                                <td>2.5 Kg</td>
                                <td>60</td>
                              </tr>
                              <tr>
                                <td>5 Kg</td>
                                <td>100</td>
                              </tr>
                              <tr>
                                <td>10 Kg</td>
                                <td>160</td>
                              </tr>
                              <tr>
                                <td>15 Kg</td>
                                <td>230</td>
                              </tr>
                              <tr>
                                <td>20 Kg</td>
                                <td>280</td>
                              </tr>
                              <tr>
                                <td>30 Kg</td>
                                <td>370</td>
                              </tr>
                            </tbody>
                          </table>
                        </div> 
                      `;
      }
    }
  });
