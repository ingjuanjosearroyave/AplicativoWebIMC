<template>
  <div>
    <br />
    <b-container class="bv-example-row">
      <b-row cols="3">
        <b-col>
          <b-card title="Gestión del Índice de Masa Corporal de los Usuarios">
            <b-card-text>Ingrese los datos requeridos para calcular su IMC:</b-card-text>

            <b-form action="javascript:void(0)" @submit="crearUsuario()">
              <b-form-group>
                <b-form-select
                  v-model="usuario.tipoidentificacion"
                  :options="tipoIdentificacion"
                  required
                ></b-form-select>
              </b-form-group>
              <b-form-group label="Identificación" label-for="id">
                <b-form-input
                  class="form-control"
                  type="number"
                  v-model="usuario.id"
                  placeholder="Ingrese Id de la Tarea"
                  required
                  id="id"
                />
              </b-form-group>

              <b-form-group label="Nombres" label-for="nombres">
                <b-form-input
                  class="form-control"
                  v-model="usuario.nombres"
                  placeholder="Ingrese Nombres del Usuario"
                  required
                  id="nombres"
                />
              </b-form-group>

              <b-form-group label="Apellidos" label-for="apellidos">
                <b-form-input
                  class="form-control"
                  v-model="usuario.apellidos"
                  placeholder="Ingrese Apellidos del Usuario"
                  required
                  id="apellidos"
                />
              </b-form-group>

              <b-form-group label="Correo" label-for="correo">
                <b-form-input
                  class="form-control"
                  v-model="usuario.correo"
                  id="correo"
                  placeholder="Ingrese Correo del Usuario"
                  required
                />
              </b-form-group>

              <b-form-group label="Peso" label-for="peso">
                <b-form-input
                  type="number"
                  class="form-control"
                  v-model="usuario.peso"
                  id="peso"
                  placeholder="Ingrese peso del usuario en cm"
                  required
                />
              </b-form-group>

              <b-form-group label="Estatura" label-for="estatura">
                <b-form-input
                  type="number"
                  class="form-control"
                  v-model="usuario.estatura"
                  id="estatura"
                  placeholder="Ingrese estatura del usuario "
                  required
                />
              </b-form-group>

              <b-button type="submit" variant="primary" v-if="!enEdicion">Crear Usuario</b-button>
              <b-button @click="actualizarUsuario()" variant="success" v-else>Actualizar Usuario</b-button>
            </b-form>
          </b-card>
          <br />
        </b-col>
        <b-col>
          <b-table striped hover :items="lista_usuario">
            <template v-slot:cell(acciones)="row">
              <b-button
                size="sm"
                @click="cargarUsuario(row)"
                class="mr-2"
                variant="success"
              >Actualizar</b-button>
              <br />
              <br />
                <b-button variant="primary" @click="mostrarestado()" class="mb-2">Estado</b-button>
              <br />
              <br />
              <b-button
                size="sm"
                @click="eliminarUsuario(row)"
                class="mr-2"
                variant="warning"
              >Eliminar</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>



<script src="../assets/gestionimc.js"/>



