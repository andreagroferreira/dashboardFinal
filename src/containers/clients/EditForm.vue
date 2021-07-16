<template>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4" :title="basicForm.name">
        <b-form v-if="render" @submit.prevent="onBasicSubmit">
          <b-form-group label="Nome">
            <b-form-input type="text" v-model.trim="basicForm.name" :state="!$v.basicForm.name.$error" placeholder="Nome" />
            <b-form-invalid-feedback>O Nome é obrigatório</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group :label="$t('forms.email')">
            <b-form-input type="email" v-model.trim="basicForm.email" :state="!$v.basicForm.email.$error" placeholder="Nome" :placeholder="$t('forms.email')" />
            <b-form-invalid-feedback>O email é obrigatório</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Contacto">
            <b-form-input
              type="text"
              v-model.trim="basicForm.phone"
              placeholder="Contacto"
              :state="!$v.basicForm.phone.$error"
            />
            <b-form-invalid-feedback>O contacto é obrigatório</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Plataforma">
            <b-form-select  :searchable="false" :options="categories" v-model.trim="basicForm.platform" :state="!$v.basicForm.platform.$error" plain />
            <b-form-invalid-feedback>Tem que selecionar uma Plataforma.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Estado">
            <b-form-select  :options="status"
                            :state="!$v.basicForm.status.$error"
                            v-model.trim="basicForm.status" plain />

            <b-form-invalid-feedback>Tem que selecionar um estado.</b-form-invalid-feedback>
          </b-form-group>
          <b-button type="submit" variant="primary" class="mt-4">Actualizar</b-button>
          <router-link class="btn btn-warning mt-4 ml-3" :to="`/app/leads/convert-lead/${userId}`">Converter</router-link>
          <b-button @click="deleteLeads" type="submit" variant="danger" class="mt-4 ml-3">Eliminar</b-button>
        </b-form>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Api from "@/services/Api";
import {validationMixin} from "vuelidate";
import {mapGetters} from "vuex";
const {required, email} = require("vuelidate/lib/validators");
export default {
  components: {
    "v-select": vSelect
  },
  props:['userId'],
  mixins: [validationMixin],
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
    })
  },
  data() {
    return {
      render: false,
      basicForm: {
        email: "",
        name: "",
        platform: "" ,
        status: "",
        phone: ""
      },
      categories: [],
      status:  [
        {
          text: "Nova Lead",
          value: "pending"
        },
        {
          text: "Negócio não feito",
          value: "unsubscribe"
        },
        {
          text: "Contactado",
          value: "contacted"
        },
        {
          text: "Contactar mais tarde",
          value: "contactLater"
        }
      ]
    };
  },
  validations: {
    basicForm: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required
      },
      platform:{
        required
      },
      status:{
        required
      }
    }

  },
  methods: {
    onBasicSubmit() {
      this.$v.$touch();
      if(!this.$v.$invalid){
        Api.UpdateLead(this.userId,this.basicForm).then(response => {
          this.$notify('success', 'Lead Actualizada com sucesso', response.data.success, { duration: 3000, permanent: false });
        },error=>{
          console.log(error)
        })
      }
    },
    getPlatforms()
    {
      Api.GetPlatforms().then(response =>{

        response.data.map(item => this.categories.push(
          {
            text: item.title,
            value: item.id
          }
        ))
        this.getLead()
      })
    },
    getLead()
    {
      Api.GetLead(this.userId).then(response =>{

        this.basicForm.name = response.data.lead.name
        this.basicForm.email = response.data.lead.email
        this.basicForm.phone = response.data.lead.phone
        this.basicForm.status =  this.status.value = response.data.lead.status
        this.basicForm.platform = this.categories.value = response.data.lead.service_id
        this.basicForm.user_id = this.currentUser.user.id
        this.render = true
      },error =>{
        console.log(error)
      })
    },
    deleteLeads()
    {
        Api.DestroyLead([this.userId]).then(result =>{
          if(result.data.error)
          {
            this.$notify('error', 'Erro ao registar', result.data.error, { duration: 3000, permanent: false });
            return
          }
          this.$notify('success', 'Lead Eliminada', result.data.success, { duration: 3000, permanent: false });
          this.$router.push({ path: '/app/leads/' })
        },(error) =>{
          console.log(error)
        })

    },
  },
  created()
  {
    this.getPlatforms()
  }
};
</script>
