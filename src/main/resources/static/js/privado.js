if (document.getElementById("app")) {
  const app = new Vue({
    el: "#app",
    data: {
      view: "",
    },
    mounted() {
      if (localStorage.vista) {
        this.view = localStorage.vista;
      } else {
        this.view = "index";
      }
    },
    methods: {
      cambiarVista(name) {
        localStorage.vista = name;
        this.view = name;
      },
    },
    components: {
      index: {
        data: function () {
          return {
            msj: "holamis",
            cuentos: [],
            deleted: false,
          };
        },
        template: `<div class='container'>
        <h2 class='my-2'>Administrador de Cuentos</h2>
        <div class='d-flex justify-content-end'>
        <button class='btn btn-secondary my-4 btn-lg px-5 ' @click="cambiarVista('created')"><i class="fa fa-plus"></i> Nuevo</button>
        </div>
        <table class="table table-striped table-light table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Imagen url</th>
            <th>puntaje</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cuento in cuentos">
            <td>{{cuento.id}}</td>
            <td>{{cuento.titulo}}</td>
            <td>{{cuento.autor}}</td>
            <td>{{cuento.imagen}}</td>
            <td>{{cuento.puntos}}</td>
            <td>
              <a class="btn btn-warning" v-on:click="verMas(cuento)" >Modificar</a>
              <button v-on:click="eliminar(cuento.id)" class="btn btn-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="deleted" class="alert alert-dark" role="alert">
        A simple dark alert—check it out!
      </div>
          </div>
            `,
        created() {
          var url = "http://localhost:8080/cuentos";
          this.fetchData(url);
        },
        methods: {
          fetchData(url) {
            this.loading = true;
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                this.cuentos = data;
                console.log(data);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          verMas(cuento) {
            localStorage.setItem("cuento", JSON.stringify(cuento));
            localStorage.vista = "updated";
            location.reload();
          },
          eliminar(id) {
            const url = "http://localhost:8080/cuentos/" + id;
            var options = {
              method: "DELETE",
            };
            fetch(url, options)
              .then((res) => res.text()) // or res.json()
              .then((res) => {
                let newU = this.cuentos.filter((item) => item.id != id);
                this.cuentos = newU;
                this.deleted = true;
              });
            setTimeout(() => {
              this.deleted = false;
            }, 1000);
          },
          cambiarVista(name) {
            localStorage.vista = name;
            this.view = name;
            location.reload();
          },
        },
      },
      created: {
        data: function () {
          return {
            msj2: "dssds",
            cuentonuevo: {
              titulo: "",
              cuerpo: "",
              autor: "",
              imagen: "",
              reseña: "",
            },
          };
        },
        template: `
          <div class='container py-5 '>
          <h5 class='my-4'>Nuevo Cuento</h5>
          <form>
          <div class="mb-3">
            <label for="Titulo">Titulo</label>
            <input type="text" class="form-control" v-model='cuentonuevo.titulo' /><br />
          </div>
          <div class="mb-3">
            <label for="Autor">Autor</label>
            <input type="text" class="form-control" v-model='cuentonuevo.autor' />
            <br />
          </div>
          <div class="mb-3">
            <label for="Imagen">Imagen</label>
            <input type="text" class="form-control" v-model='cuentonuevo.imagen' />
            <br />
          </div>
          <div class="mb-3">
          <label for="Reseña" class="form-label">Reseña/label>
          <input type ="text" class="form-control" v-model='cuentonuevo.reseña'></input>
            <br />
          </div>
          <div class="mb-3">
          <label for="Cuerpo" class="form-label">Cuerpo</label>
          <textarea class="form-control" v-model='cuentonuevo.cuerpo' rows="7"></textarea>
            <br />
          </div>
          <div class='d-flex justify-content-end'>
          <button type="button" class="btn btn-primary mx-2" @click="cambiarVista('index')">
            Cancelar
          </button>
          <button type="button" class="btn btn-success" @click="guardarCuento()">
            Guardar
          </button>
          </div>
        </form>
        </div>
          `,
        methods: {
          guardarCuento() {
            let url = "http://localhost:8080/cuentos";
            var options = {
              body: JSON.stringify(this.cuentonuevo),
              method: "POST",
              headers: { "Content-Type": "application/json" },
              // redirect: 'follow'
            };
            fetch(url, options)
              .then(function () {
                console.log("creado");
                alert("Grabado");

                // Handle response we get from the API
              })
              .catch((err) => {
                //this.errored = true
                console.error(err);
              });
          },
          cambiarVista(name) {
            localStorage.vista = name;
            this.view = name;
            location.reload();
          },
        },
      },
      updated: {
        data: function () {
          return {
            cuento: {},
          };
        },
        mounted() {
          if (localStorage.cuento) {
            this.cuento = JSON.parse(localStorage.cuento);
          }
        },
        template: `
          <div class='container py-5'>
          <form>
          <div class="mb-3">
            <label for="Titulo">Titulo</label>
            <input type="text" class="form-control" v-model='cuento.titulo' /><br />
          </div>
          <div class="mb-3">
            <label for="Autor">Autor</label>
            <input type="text" class="form-control" v-model='cuento.autor' />
            <br />
          </div>
          <div class="mb-3">
            <label for="Imagen">Imagen</label>
            <input type="text" class="form-control" v-model='cuento.imagen' />
            <br />
          </div>
          <div class="mb-3">
          <label for="Reseña" class="form-label">Reseña</label>
          <input type ="text" class="form-control" v-model='cuento.reseña'></input>
            <br />
          </div>
          <div class="mb-3">
          <label for="Cuerpo" class="form-label">Cuerpo</label>
          <textarea class="form-control" v-model='cuento.cuerpo' rows="7"></textarea>
            <br />
          </div>
          
          <button type="button" class="btn btn-success" @click="mandarAlert()">
            Grabar
          </button>
        </form>
        </div>
          `,
        methods: {
          mandarAlert() {
            let url = "http://localhost:8080/cuentos";
            var options = {
              body: JSON.stringify(this.cuento),
              method: "POST",
              headers: { "Content-Type": "application/json" },
              // redirect: 'follow'
            };
            fetch(url, options)
              .then(function () {
                console.log("creado");
                alert("Grabado");

                // Handle response we get from the API
              })
              .catch((err) => {
                //this.errored = true
                alert("Error al grabar");
                console.error(err);
              });
          },
        },
      },
      cuento: {
        data: function () {
          return {
            msj2: "dssds",
            cuento: {},
          };
        },

        mounted() {
          if (localStorage.cuento) {
            this.cuento = JSON.parse(localStorage.cuento);
          }
        },
        template: `
          <div class='container py-5'>
            <div class="card container" style="width: 50rem;">
              <img :src="cuento.imagen"class="card-img-top" :alt="cuento.titulo">
              <div class="card-body">
              <h5 class="card-title">{{cuento.titulo}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{cuento.autor}}</h6>
              <p class="card-text">{{cuento.cuerpo}}</p>
              <p class="card-text"><small class="text-muted">{{cuento.puntos}}</small></p>
              </div>
            </div>
          </div>
          `,
        methods: {},
      },
    },
  });
}
