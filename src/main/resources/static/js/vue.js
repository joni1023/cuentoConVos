const NotFound = { template: "<p>Page not found</p>" };
const Home = { template: "<p>home page</p>" };
const About = { template: "<p>about page</p>" };
const routes = {
  "/": About,
  "/about": About,
};

const app = new Vue({
  el: "#idApp",
  data: {
    currentRoute: window.location.pathname,
    frutas: [
      { nombre: "manzana", stock: 1 },
      { nombre: "pera", stock: 12 },
      { nombre: "anana", stock: 31 },
    ],
    nuevaFruta: "",
    nuevaCantidad: 0,
    total: 0,
  },
  methods: {
    agregarFruta() {
      this.frutas.push({
        nombre: this.nuevaFruta,
        stock: parseInt(this.nuevaCantidad),
      });
      this.nuevaFruta = "";
    },
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound;
    },
    sumarFrutas() {
      this.total = 0;
      for (x of this.frutas) {
        this.total += x.stock;
      }
      return this.total;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});
