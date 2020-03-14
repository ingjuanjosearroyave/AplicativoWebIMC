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
  methods: {
    crearUsuario() {
      let calculo = (this.usuario.peso / (this.usuario.estatura * this.usuario.estatura)) * 10000;
      this.x = calculo.toFixed(2)
      this.usuario.IMC = this.x
      this.lista_usuario.push(this.usuario);
      localStorage.setItem(this.usuario.id, JSON.stringify(this.usuario));
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


    },
    eliminarUsuario({ item }) {
      let posicion = this.lista_usuario.findIndex(
        usuario => usuario.id == item.id
      );
      this.lista_usuario.splice(posicion, 1);
      localStorage.removeItem(this.usuario.id);

    },
    cargarUsuario({ item }) {
      let task = JSON.parse(localStorage.getItem(item));
      this.enEdicion = true;
      this.usuario = Object.assign({}, task);

    },
    actualizarUsuario() {
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

    },
    makeToast(variant = null) {
      if (this.x < 18.5) {
        this.estado = "Peso Inferio al Normal";
      }
      else{
        if (this.x >= 18.5 || this.x <= 24.9) {
          this.estado = "Peso normal";
        }
        else{
          if (this.x >= 25 && this.x <= 29.9) {
            this.estado = "Peso superior al normal";
          }
          else{
            if (this.x >= 30) {
              this.estado = "Obesidad";
            }
          }
        }
      }
      this.$bvToast.toast('Su estado medido desde el IMC ES :' + this.estado, {
        title: `Notificación de su estado`,
        variant: variant,
        solid: true
      })
    },

  }
};
