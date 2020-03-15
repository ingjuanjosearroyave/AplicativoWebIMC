export default {
  data() {
    return {
      /** variables globales */
      x: 0,
      estado: "",
      mensaje: "CRUD De Indice de Masa Corporal Usuario",
      enEdicion: false,
      /** json para la ejecución y creación del crud en el aplicativo */
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
      /** array de  usuario para previsualización en el aplicativo  */
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
    //this.created();
  },
   /** Determina las validaciones de los campos vacios en la aplicacion */
  computed: {
    validacion1() {
      return this.usuario.id.length > 0
    },
    validacion2() {
      return this.usuario.tipoidentificacion > 0
    },
    validacion3() {
      return this.usuario.nombres.length > 0
    },
    validacion4() {
      return this.usuario.apellidos.length > 0
    },
    validacion5() {
      return this.usuario.correo.length > 0
    },
    validacion6() {
      return this.usuario.peso.length > 0
    },
    validacion7() {
      return this.usuario.estatura.length > 0
    }
  },
  methods: {
    /** metodo que permite crear el usuario con sus datos requerido y calcula su IMC almacenando en el localstorage */
    crearUsuario() {
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
        this.estado = ""
      }
      else {
        alert('Este usuario ya se encuentra Registrado')
      }
    },
    /** 
     * Metodo que elimina el usuario registrado de la lista y del localstorage
     */
    eliminarUsuario({ item }) {
      let posicion = this.lista_usuario.findIndex(
        usuario => usuario.id == item.id
      );
      this.lista_usuario.splice(posicion, 1);
      this.saveLocalStorage();
    },
    /** metodo que carga el usuario desde una lista previa definida y almacena en el localstorage */
    cargarUsuario({ item }) {
      let cargarusuario = this.lista_usuario.find(
        usuario => usuario.id == item.id
      );
      this.enEdicion = true;
      this.usuario = Object.assign({}, cargarusuario);
      this.saveLocalStorage();

    },
    /** metodo que permite actualizar un usuario registrado tambien desde el localstorage */
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
    /** metodo que permite guardar los cambios que se hagan en el localstorage */
    saveLocalStorage() {
      localStorage.setItem("usuario", JSON.stringify(this.lista_usuario));
    },
    /** metodo que permite hacer los cambios necesario y almacenar en el localstorage  */
    getLocalStorage() {
      if (localStorage.getItem("usuario")) {
        this.lista_usuario = JSON.parse(localStorage.getItem("usuario"));
      }
    },
    /**metodo que crea una notificacion emergente para visualizar el estado del usuario */
    makeToast(variant = null) {
      if (this.x < 18.5) { this.estado = "Peso inferior al normal"; }
      else if (this.x >= 18.5 && this.x <= 24.9) { this.estado = "Peso normal"; }
      else if (this.x >= 25 && this.x <= 29.9) { this.estado = "Peso superior al normal"; }
      else if (this.x > 30) { this.estado = "Obesidad"; }
      else {
        alert("No ingresaste el peso y estatura")
      }
      this.$bvToast.toast('Su estado medido desde el IMC ES : ' + this.estado, {
        title: `Notificación de su condición Física a partir del IMC`,
        variant: variant,
        solid: true
      })
      this.estado = ""
    },
    /** Permite crear datos para revisualizar y almacenar en el localstorage */
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
