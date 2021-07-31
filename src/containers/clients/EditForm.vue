<template>
  <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
    <b-tab title="Perfil Cliente">
      <b-row>
        <b-colxx xxs="12" lg="4" class="mb-4">
          <b-card class="mb-4" no-body>
            <div class="position-absolute card-top-buttons">
              <b-button variant="outline-white" class="icon-button">
                <i class="simple-icon-pencil"/>
              </b-button>
            </div>
            <img style="width: 200px; height: 200px; margin:auto; object-fit: cover;border-radius:10px"
                 src="https://upload.wikimedia.org/wikipedia/commons/4/43/Foto_Perfil.jpg" alt="Detail"
                 class="card-img-top mt-2"/>
            <b-card-body>
              <p class="text-muted text-secondary white-underline-link font-weight-bold mb-2">Identificação</p>
              <p class="mb-1">
                <strong class="text-primary">Nome:</strong> {{ basicForm.name }}
              </p>
              <p class="mb-1">
                <strong class="text-primary ">Email:</strong> {{ basicForm.email }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">Contacto:</strong> {{ basicForm.phone }}
              </p>
              <p class="text-muted text-secondary white-underline-link  font-weight-bold my-2">Dados</p>
              <p class="mb-1">
                <strong class="text-primary">Nº Identificação:</strong> {{ metaUser.document }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">NIF:</strong> {{ metaUser.nif }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">Cédula Profissional:</strong> {{ metaUser.cedula_profissional }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">Data Nascimento:</strong> {{ metaUser.birth_date }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">Idade:</strong> {{ metaUser.age }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">Género:</strong> {{ metaUser.genre }}
              </p>
              <p class="text-muted text-secondary white-underline-link font-weight-bold my-2">Morada</p>
              <p class="mb-1">
                <strong class="text-primary">Morada:</strong> {{ addressForm.street }}, {{ addressForm.number }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">Localidade:</strong> {{ addressForm.city }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">Distrito:</strong> {{ addressForm.district }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">Código Postal:</strong> {{ addressForm.zipCode }}
              </p>
              <p class="mb-1">
                <strong class="text-primary">País:</strong> {{ addressForm.country }}
              </p>

              <p class="text-muted  text-secondary white-underline-link font-weight-bold my-2">Plataformas</p>
              <div class="mb-3">
                <p class="d-sm-inline-block mb-1">
                  <b-badge v-for="platform in platformsActive" :key="platform.id" pill variant="outline-secondary"
                           class="mb-1 mr-1">{{ filterPlatform(platform.id) }}
                  </b-badge>
                </p>
              </div>
              <p class="text-muted  text-primary font-weight-bold  white-underline-link mb-2">Estado</p>
              <h6>
                <b-badge class="mb-1" pill :variant="getClassByStatus(statusFilter.value)">{{ statusFilter.text }}
                </b-badge>
              </h6>
            </b-card-body>
          </b-card>
          <radial-progress-card
            :title="$t('pages.order-status')"
            :percent="85"
            no-suffle
            class="mb-4"
          />
          <radial-progress-card
            :title="$t('pages.bake-progress')"
            :percent="40"
            no-suffle
            class="mb-4"
          />
        </b-colxx>
        <b-colxx xxs="12" lg="8">
          <small-line-charts itemClass="dashboard-small-chart" v-if="render"></small-line-charts>
          <website-visit-chart-card class="mb-4"></website-visit-chart-card>
          <b-card class="mb-4" :title="$t('pages.comments')">
            <comment-item
              v-for="(comment,index) in comments"
              :key="index"
              :data="comment"
              detail-path="#"
            />
          </b-card>
        </b-colxx>
      </b-row>
    </b-tab>
    <b-tab title="Actualizar Cliente">
      <b-row>
        <b-colxx xxs="12">
          <b-card class="mb-4">
            <b-tabs card no-fade>
              <b-tab title="Dados do Cliente" active>
                <b-form class="av-tooltip tooltip-label-right">
                  <b-form-group label="Nome">
                    <b-form-input type="text" v-model.trim="$v.basicForm.name.$model" :state="!$v.basicForm.name.$error" />
                    <b-form-invalid-feedback>Nome é obrigatório!</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group label="Email">
                    <b-form-input type="email" v-model.trim="$v.basicForm.email.$model" :state="!$v.basicForm.email.$error" />
                    <b-form-invalid-feedback>O Email é obrigatório!</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group label="Contacto">
                    <b-form-input type="text" v-model.trim="$v.basicForm.phone.$model" :state="!$v.basicForm.phone.$error" />
                    <b-form-invalid-feedback>O contacto é obrigatório!</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group label="Plataforma">
                    <v-select
                      v-model.trim="$v.basicForm.platform.$model"
                      :state="!$v.basicForm.platform.$error"
                      multiple
                      :options="selectData"
                      :dir="direction"
                    />
                    <p class="text-danger mt-2" v-if="!$v.basicForm.platform.checkPlatform"> Tem que selecionar uma plataforma</p>
                  </b-form-group>
                  <b-button type="submit" variant="primary" class="mt-4">Actualizar</b-button>
                  <b-button @click="deleteClient" type="submit" variant="danger" class="mt-4 ml-3">Eliminar</b-button>
                </b-form>
                </b-tab>
              <b-tab title="Identificação">
                <b-form class="av-tooltip tooltip-label-right" @submit.prevent="onBasicSubmit">
                  <b-form-group label="Nº de identificação">
                    <b-form-input type="text"  v-model="metaUser.document"/>
                  </b-form-group>
                  <b-form-group label="Nº Contribuinte (NIF)">
                    <b-form-input type="number" maxlength="9" v-model.trim="$v.metaUser.nif.$model" :state="!$v.metaUser.nif.$error" />
                    <b-form-invalid-feedback v-if="!$v.metaUser.nif.required">O NIF é obrigatório!</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.metaUser.nif.minLength || !$v.metaUser.nif.maxLength">Formato do NIF Inválido!</b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group label="Data de Nascimento">
                    <datepicker
                      :bootstrap-styling="true"
                      :placeholder="$t('form-components.date')"
                      v-model="metaUser.birth"
                    ></datepicker>
                  </b-form-group>
                  <b-form-group label="Género">
                    <b-form-select  :options="genreData"
                                    v-model="metaUser.genre" plain />
                  </b-form-group>
                  <b-button type="submit" variant="primary" class="mt-4">Actualizar</b-button>
                </b-form>
              </b-tab>
              <b-tab title="Morada">
                <p>Morada</p>
              </b-tab>
              <b-tab title="Método de Pagamento">
                <p>Método de Pagamento</p>
              </b-tab>
              <b-tab title="Plano">
                <p>Plano</p>
              </b-tab>
            </b-tabs>

          </b-card>
        </b-colxx>
      </b-row>
    </b-tab>
  </b-tabs>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Api from "@/services/Api";
import {validationMixin} from "vuelidate";
import {mapGetters} from "vuex";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import { getDirection } from "@/utils";
const {  required,
  email,
  minLength,
  maxLength,
  helpers} = require("vuelidate/lib/validators");
export default {
  components: {
    "v-select": vSelect,
    datepicker: Datepicker
  },
  props: ['userId'],
  mixins: [validationMixin],
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
    })
  },
  data() {
    return {
      render: false,
      selectData: [],
      basicForm: {
        email: "",
        name: "",
        platform: "",
        statusFilter: "",
        phone: ""
      },
      metaUser: {
        document: 'Não Definido',
        nif: 'Não Definido',
        birth_date: 'Não Definido',
        genre: 'Não Definido',
        cedula_profissional: 'Não Definido',
      },
      addressForm: {
        street: 'Não Definido',
        number: 'Não Definido',
        city: 'Não Definido',
        country: 'Não Definido',
        zipCode: 'Não Definido',
        district: 'Não Definido',
      },
      platformsActive: [],
      categories: [],
      status: [
        {
          text: "Ainda não fez Login",
          value: "pending"
        },
        {
          text: "Cliente Activo",
          value: "active"
        },
        {
          text: "Cliente Desativado",
          value: "disable"
        },
        {
          text: "Contactar mais tarde",
          value: "contactLater"
        }
      ],
      countryList:[
        {
          text: "Portugal",
          value: "pt"
        },
        {
          text: "Brasil",
          value: "br"
        },
      ],
      genreData:[
        {
          text: "Masculino",
          value: "masc"
        },
        {
          text: "Feminino",
          value: "fem"
        },
      ],
      direction: getDirection().direction,
    };
  },
  validations: {
    basicForm: {
      name: {
        required
      },
      email:{
        required
      },
      phone:{
        required
      },
      platform:{
        checkPlatform(value)
        {
          return  helpers.req(value)
        }
      },
      status: {
        required
      },
    },
    metaUser: {
      nif:{
        required,
        minLength: minLength(9),
        maxLength: maxLength(9)
      }

    },


  },
  methods: {
    onBasicSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Api.UpdateLead(this.userId, this.basicForm).then(response => {
          this.$notify('success', 'Lead Actualizada com sucesso', response.data.success, {
            duration: 3000,
            permanent: false
          });
        }, error => {
          console.log(error)
        })
      }
    },
    getPlatforms() {
      Api.GetPlatforms().then(response => {

        response.data.map(item => this.categories.push(
          {
            label: item.title,
            value: item.id
          }
        ))
        response.data.map(item => this.selectData.push(
          {
            label: item.title,
            value: item.id
          }
        ))
        this.getLead()
      })
    },
    getLead() {
      Api.GetClient(this.userId).then(response => {

        this.basicForm.name = response.data.client.name
        this.basicForm.email = response.data.client.email
        this.basicForm.phone = response.data.client.phone
        this.basicForm.status = response.data.client.status
        this.basicForm.platform = this.categories.filter(item => item.value === response.data.platform.service_id)
        this.basicForm.user_id = this.currentUser.user.id
        this.platformsActive = response.data.platform
        this.metaUser.document = response.data.user_meta.document !== '' ? response.data.user_meta.document : 'Não Definido'
        this.metaUser.nif = response.data.user_meta.nif !== '' ? response.data.user_meta.nif : 'Não Definido'
        this.metaUser.genre = response.data.user_meta.genre === 'masc' ? 'Masculino' : 'Feminino';
        this.metaUser.age = response.data.user_meta.age !== '' ? response.data.user_meta.age : 'Não Definido'
        this.metaUser.birth_date = response.data.user_meta.birth_date !== '' ? response.data.user_meta.birth_date : 'Não Definido'
        this.metaUser.cedula_profissional = response.data.user_meta.cedula_profissional !== '' ? response.data.user_meta.cedula_profissional : 'Não Definido'
        this.addressForm.city = response.data.address.city !== '' ? response.data.address.city : 'Não Definido'
        this.addressForm.country = response.data.address.country !== '' ? response.data.address.country : 'Não Definido'
        this.addressForm.district = response.data.address.district !== '' ? response.data.address.district : 'Não Definido'
        this.addressForm.number = response.data.address.number !== '' ? response.data.address.number : 'Não Definido'
        this.addressForm.street = response.data.address.street !== '' ? response.data.address.street : 'Não Definido'
        this.addressForm.zipCode = response.data.address.zipCode !== '' ? response.data.address.zipCode : 'Não Definido'
        this.status.filter(item => {

          if (item.value === response.data.client.status) {

            return this.statusFilter = item
          }
        })
        this.render = true
      }, error => {
        console.log(error)
      })
    },
    filterPlatform(platformID) {
      return this.categories.filter(item => item.value === platformID)[0].text
    },
    deleteClient() {
      Api.DestroyClients([this.userId]).then(result => {
        if (result.data.error) {
          this.$notify('error', 'Erro ao registar', result.data.error, {duration: 3000, permanent: false});
          return
        }
        this.$notify('success', 'Cliente Eliminado', result.data.success, {duration: 3000, permanent: false});
        this.$router.push({path: '/app/leads/'})
      }, (error) => {
        console.log(error)
      })

    },
    getClassByStatus(status) {
      switch (status) {
        case 'active':
          return 'success'
          break
        case 'pending':
          return 'warning'
          break
        case 'disable':
          return 'danger'
          break
        default:
          return 'primary'
      }
    }
  },
  created() {
    this.getPlatforms()
  }
};
</script>
