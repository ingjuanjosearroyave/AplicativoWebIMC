export default {
  data() {
    return {
      x: 0,
      estado: "",
      mensaje: "CRUD De Indice de Masa Corporal Usuario",
      enEdicion: false,
      usuario: {
        tipoidentificacion: "",
        id: "",
        nombres: "",
        apellidos: "",
        correo: "",
        peso: "",
        estatura: "",
        IMC: "",
        acciones: true
      },
      lista_usuario: [
        {
          tipoidentificacion: "CC",
          id: "1001775643",
          nombres: "Juan Diego",
          apellidos: "Olivares",
          correo: "estasgordo@gmail.com",
          peso: "90",
          estatura: "1.78",
          IMC: "28.41",
          acciones: true
        }
      ], tipoIdentificacion: [
        { value: null, text: "Seleccione un tipo de identificación", disabled: true },
        { value: "CC", text: "CC" },
        { value: "CE", text: "CE" },
        { value: "RN", text: "RN" },
        { value: "TI", text: "TI" }
      ]
    };
  },
  mounted() {
    this.created();
  },
  methods: {
    crearUsuario() {
      this.x = 0;
      if (this.lista_usuario.findIndex(usuario => usuario.id == this.usuario.id) === -1) {
        let calculo = (this.usuario.peso / (this.usuario.estatura * this.usuario.estatura)) * 10000;
        this.x = calculo.toFixed(2)
        this.usuario.IMC = this.x
        this.lista_usuario.push(this.usuario)
        this.usuario = {
          tipoidentificacion: "",
          id: "",
          nombres: "",
          apellidos: "",
          correo: "",
          peso: "",
          estatura: "",
          IMC: "",
          acciones: true
        };
        this.saveLocalStorage();
      }
      else {
        alert('Este usuario ya se encuentra Registrado')
      }
    },
    eliminarUsuario({ item }) {
      let posicion = this.lista_usuario.findIndex(
        usuario => usuario.id == item.id
      );
      this.lista_usuario.splice(posicion, 1);
      this.saveLocalStorage();
    },
    cargarUsuario({ item }) {
      let cargarusuario = this.lista_usuario.find(
        usuario => usuario.id == item.id
      );
      this.enEdicion = true;
      this.usuario = Object.assign({}, cargarusuario);
      this.saveLocalStorage();

    },
    actualizarUsuario() {
      let calculo = (this.usuario.peso / (this.usuario.estatura * this.usuario.estatura)) * 10000;
      this.x = calculo.toFixed(2)
      this.usuario.IMC = this.x
      let posicion = this.lista_usuario.findIndex(
        usuario => usuario.id == this.usuario.id
      );
      this.lista_usuario.splice(posicion, 1, this.usuario);
      localStorage.setItem(posicion, this.usuario);
      this.usuario = {
        tipoidentificacion: "",
        id: "",
        nombres: "",
        apellidos: "",
        correo: "",
        peso: "",
        estatura: "",
        IMC: "",
        acciones: true
      };
      this.saveLocalStorage();
      this.enEdicion = false
    },
    saveLocalStorage() {
      localStorage.setItem("usuario", JSON.stringify(this.lista_usuario));
    },
    getLocalStorage() {
      if (localStorage.getItem("usuario")) {
        this.lista_usuario = JSON.parse(localStorage.getItem("usuario"));
      }
    },
    mostrarestado() {
      if (this.x < 18.5) { alert("Peso inferior al normal") }
      else if (this.x >= 18.5 && this.x <= 24.9) { alert("Peso normal") }
      else if (this.x >= 25 && this.x <= 29.9) { alert("Peso superior al normal") }
      else if (this.x > 30) { alert("Obesidad") }
      else {
        alert("No ingresaste el peso y estatura")
      }    
    },
    makeToast(variant = null) {

      if (this.x < 18.5) { this.estado = "Peso inferior al normal"; }
      else if (this.x >= 18.5 && this.x <= 24.9) { this.estado = "Peso normal"; }
      else if (this.x >= 25 && this.x <= 29.9) { this.estado = "Peso superior al normal"; }
      else if (this.x > 30) { this.estado = "Obesidad"; }
      else {
        alert("No ingresaste el peso y estatura")
      }
      this.$bvToast.toast('Su estado medido desde el IMC ES :' + this.estado, {
        title: `Notificación de su estado`,
        variant: variant,
        solid: true
      })
      this.estado = ""
    },
    created() {
      let datos = JSON.parse(localStorage.getItem('Usuario'))
      if (!datos) {
        this.lista_usuario = []
      }
      else {
        this.lista_usuario = datos;

      }
    }
  }
};
