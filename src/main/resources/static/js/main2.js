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
          };
        },
        template: `<div class='container'>
        <div class="row row-cols-1 row-cols-md-3 g-4 py-5">
            <div class="col" v-for="cuento in cuentos">
                <div class="card h-100">
                <img v-if='cuento.imagen != "" ' :src="cuento.imagen" class="card-img-top" :alt="cuento.titulo">
                <img v-if='cuento.imagen == "" ' src="https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg" class="card-img-top" alt="not found">
                  <div class="card-body">
                  <h5 class="card-title">{{cuento.titulo}}</h5>
                    <p class="card-text">{{cuento.autor}}</p>
                    <p class="card-text">{{cuento.reseña}}</p>
                      <button type="button" class="btn btn-success" @click="verMas(cuento)">
                      ver mas
                      </button>
                  </div>
                </div>
            </div>
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
            localStorage.vista = "cuento";
            location.reload();
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
        methods: {
          cambiarVista(name) {
            localStorage.vista = name;
            location.reload();
          },
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
            <button class="btn btn-primary" v-on:click="cambiarVista('index')">volver</button>
            </div>
          </div>
        </div>
        `,
      },
    },
  });
}
