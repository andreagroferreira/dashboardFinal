<template>
  <b-card no-body>
    <b-card-body class="wizard wizard-default">
      <form-wizard v-if="canRender" :with-validate="true" :last-step-end="true" :top-nav-disabled="false">
        <tab name="Dados Cliente" desc="Dados da conta do cliente" :selected="true" :validate="validateStep1" :submit="submitStep1">
          <div class="wizard-basic-step">
            <b-form class="av-tooltip tooltip-label-right">
              <b-form-group label="Nome">
                <b-form-input type="text" v-model.trim="$v.formStep1.name.$model" :state="!$v.formStep1.name.$error" />
                <b-form-invalid-feedback>Nome é obrigatório!</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Email">
                <b-form-input type="email" v-model.trim="$v.formStep1.email.$model" :state="!$v.formStep1.email.$error" />
                <b-form-invalid-feedback>O Email é obrigatório!</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Contacto">
                <b-form-input type="text" v-model.trim="$v.formStep1.phone.$model" :state="!$v.formStep1.phone.$error" />
                <b-form-invalid-feedback>O contacto é obrigatório!</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Plataforma">
                <v-select
                  v-model.trim="$v.formStep1.platform.$model"
                  :state="!$v.formStep1.platform.$error"
                  multiple
                  :options="selectData"
                  :dir="direction"
                />
                <p class="text-danger mt-2" v-if="!$v.formStep1.platform.checkPlatform"> Tem que selecionar uma plataforma</p>
              </b-form-group>
            </b-form>
          </div>
        </tab>
        <tab name="Identificação" desc="Dados de identificação" :validate="validateStep2" :submit="submitStep2">
          <div class="wizard-basic-step">
            <b-form class="av-tooltip tooltip-label-right">
              <b-form-group label="Nº de identificação">
                <b-form-input type="text"  v-model="formStep2.document"/>
              </b-form-group>
              <b-form-group label="Nº Contribuinte (NIF)">
                <b-form-input type="number" maxlength="9" v-model.trim="$v.formStep2.nif.$model" :state="!$v.formStep2.nif.$error" />
                <b-form-invalid-feedback v-if="!$v.formStep2.nif.required">O NIF é obrigatório!</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.formStep2.nif.minLength || !$v.formStep2.nif.maxLength">Formato do NIF Inválido!</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="Data de Nascimento">
                <datepicker
                  :bootstrap-styling="true"
                  :placeholder="$t('form-components.date')"
                  v-model="formStep2.birth"
                ></datepicker>
              </b-form-group>
              <b-form-group label="Género">
                <b-form-select  :options="genreData"
                                v-model="formStep2.genre" plain />
              </b-form-group>
            </b-form>
          </div>
        </tab>
        <tab name="Morada" desc="Dados da residencia" :validate="validateStep3" :submit="submitStep3">
          <div class="wizard-basic-step">
            <b-form class="av-tooltip tooltip-label-right">
              <b-form-group label="Morada">
                <b-form-input type="text" v-model="formStep3.address"/>
              </b-form-group>
              <b-form-group label="Número">
                <b-form-input type="number" maxlength="9" v-model="formStep3.number" />
              </b-form-group>
              <b-form-group label="Localidade">
                <b-form-input type="text" v-model="formStep3.city"/>
              </b-form-group>
              <b-form-group label="Código Postal">
                <b-form-input type="text" v-model="formStep3.zipcode"/>
              </b-form-group>
              <b-form-group label="Distrito">
                <b-form-input type="text" v-model="formStep3.district"/>
              </b-form-group>
              <b-form-group label="País">
                <b-form-select  :options="countryList"
                                v-model="formStep3.country" plain />
              </b-form-group>
            </b-form>
          </div>
        </tab>
        <tab name="Método de pagamento" desc="Método de Pagamento" :validate="validateStep4" :submit="submitStep4">
          <div class="wizard-basic-step">
            <b-form class="av-tooltip tooltip-label-right">
              <b-form-group label="IBAN">
                <b-form-input type="text" v-model.trim="$v.formStep4.iban.$model" :state="!$v.formStep4.iban.$error"/>
                <b-form-invalid-feedback v-if="!$v.formStep4.iban.required"> O IBAN é obrigatório!</b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.formStep4.iban.checkIban"> O IBAN não é válido!</b-form-invalid-feedback>
              </b-form-group>
            </b-form>
          </div>
        </tab>
        <tab name="Plano" desc="Planos de Adesão" :validate="validateStep5" :submit="submitStep5">
          <div class="wizard-basic-step">
            <b-form class="av-tooltip tooltip-label-right">
              <b-form-group label="Planos">
                <v-select
                  v-model.trim="$v.formStep5.plan.$model"
                  :state="!$v.formStep5.plan.$error"
                  multiple
                  :options="planData"
                  :dir="direction"
                />
                <p class="text-danger mt-2" v-if="!$v.formStep5.plan.checkPlans"> Tem que selecionar o numero de planos respetivos às plataformas selecionadas {{formStep1.platform.length > 0 ? formStep1.platform.map(item => {return item.label}).toString() : 'Tem que selecionar uma plataforma'}}!</p>
              </b-form-group>
            </b-form>
          </div>
        </tab>
        <tab name="Resumo" desc="Resumo Cliente" :submit="submitForm">
          <div class="wizard-basic-step">
            <div class="row">
              <div class="col-12 col-md-4">
                <p><b>Nome</b> : {{formStep1.name}}</p>
                <p><b>Email</b> : {{formStep1.email}}</p>
                <p><b>Contacto</b> : {{formStep1.phone}}</p>
                <p><b>Plataforma</b> : {{formStep1.platform.length > 0 ? formStep1.platform.map(item => {return item.label}).toString() : 'Tem que selecionar uma plataforma'}}</p>
                <p><b>Nº de identificação</b> : {{formStep2.document}}</p>
                <p><b>Nº Contribuinte (NIF)</b> : {{formStep2.nif}}</p>
                <p><b>Data de Nascimento</b> : {{formStep2.birth}}</p>
                <p><b>Género</b> : {{formStep2.genre}}</p>
              </div>
              <div class="col-12 col-md-4">
                <p><b>Morada</b> :  {{formStep3.address}}</p>
                <p><b>Número</b> :  {{formStep3.number}}</p>
                <p><b>Localidade</b> :  {{formStep3.city}}</p>
                <p><b>Código Postal</b> :  {{formStep3.zipcode}}</p>
                <p><b>Distrito</b> :  {{formStep3.district}}</p>
                <p><b>País</b> : {{formStep3.country}}</p>
              </div>
              <div class="col-12 col-md-4">
                <p><b>IBAN</b> : {{formStep4.iban}}</p>
                <p><b>Planos</b> : {{formStep5.plan.length > 0 ? formStep5.plan.map(item => {return item.label}).toString() : 'Tem que selecionar um plano'}}</p>
              </div>
            </div>
          </div>
        </tab>
        <tab type="done">
          <div class="wizard-basic-step text-center pt-3">
            <div v-if="isProcessing">
              <b-spinner variant="primary" label="Spinning" class="mb-1"></b-spinner>
              <p>{{$t('wizard.async')}}</p>
            </div>
            <div v-else>
              <h2 class="mb-2">{{$t('wizard.content-thanks')}}</h2>
              <p>{{$t('wizard.registered')}}</p>
            </div>

          </div>
        </tab>
      </form-wizard>
      <div v-else class="col-12 text-center p-3">
        <h1>{{errorMessage}}</h1><br>
        <router-link class="btn btn-primary" :to="path">{{destination}}</router-link>

      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import FormWizard from "../../components/Form/Wizard/FormWizard";
import Tab from "../../components/Form/Wizard/Tab";
import Api from "@/services/Api";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import { getDirection } from "@/utils";
import {
  validationMixin
} from "vuelidate";
import {mapGetters} from "vuex";
const {
  required,
  email,
  minLength,
  maxLength,
  helpers
} = require("vuelidate/lib/validators");

export default {
  components: {
    "form-wizard": FormWizard,
    "tab": Tab,
    "v-select": vSelect,
    datepicker: Datepicker
  },
  props:['userId'],
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
    })
  },
  data() {
    return {
      isProcessing: true,
      ibanError: false,
      canRender:false,
      errorMessage: '',
      destination: '',
      path: '',
      selectedPlatforms: [],
      clientId: '',
      formStep1: {
        name: "",
        email:"",
        phone:"",
        platform:""
      },
      formStep2: {
        document: "",
        nif: "",
        genre: "",
        birth: new Date()
      },
      formStep3: {
        address: "",
        number: "",
        zipcode: "",
        city:"",
        country: "",
        district: ""

      },
      formStep4: {
        iban: "",
      },
      formStep5: {
        plan: "",
      },
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
      selectData: [

      ],
      planData:[],
      vueSelectForm: {
        single: "",
        multiple: []
      },
      direction: getDirection().direction,
    };
  },
  mixins: [validationMixin],
  validations: {
    formStep1: {
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
      }

    },
    formStep2: {
      nif:{
        required,
        minLength: minLength(9),
        maxLength: maxLength(9)
      }

    },
    formStep3: {

    },
    formStep4: {
      iban:{
        required,
        checkIban(value){
          if(value == '')
          {
            return  false
          }
          return new Promise((resolve, reject) => {
            Api.ValidateIBAN(value).then(result => {
              resolve(result.data.valid)
            }).catch(() => reject(false))
          })
        }
      }
    },
    formStep5:{
      plan:{
        checkPlans(value)
        {

          if(this.selectedPlatforms.length > 0 && value.length === this.selectedPlatforms.length)
          {
            return true
          }else{
            return false
          }
        }
      }
    }
  },
  methods: {
    validateStep1() {
      this.$v.formStep1.$touch();
      this.updatePlataformsSelected()
      return !this.$v.formStep1.$anyError;
    },
    submitStep1() {
      console.log("step-1-submit")
    },
    validateStep2() {
      this.$v.formStep2.$touch();
      return !this.$v.formStep2.$anyError;
    },
    submitStep2() {
      console.log("step-2-submit")
    },
    submitStep3() {
      console.log("step-1-submit")
    },
    validateStep3() {
      this.$v.formStep3.$touch();
      return !this.$v.formStep3.$anyError;
    },
    submitStep4() {
      console.log("step-1-submit")
    },
   validateStep4() {
     this.$v.formStep4.$touch()
     this.getPlans()
     return !this.$v.formStep4.$anyError;

    },
    submitStep5() {
      console.log("step-1-submit")
    },
    validateStep5() {

      this.$v.formStep5.$touch()
      return !this.$v.formStep5.$anyError;
    },
    submitForm() {
      const form = {
        ...this.formStep1,
        ...this.formStep2,
        ...this.formStep3,
        ...this.formStep4,
        ...this.formStep5,
        user_id:this.currentUser.user.id,
        id: this.clientId
      };

      Api.ConvertLead(form).then(result=>{
        console.log(result)
        setTimeout(() => {
          this.isProcessing = false;
        }, 3000)
      })
    },
    convertLead()
    {
      const form = {
        ...this.formStep1,
        ...this.formStep2,
        ...this.formStep3,
        ...this.formStep4,
        ...this.formStep5,
        user_id:this.currentUser.user.id,
        id: this.clientId
      };

      console.log(form,'call to axios')
    },
    updatePlataformsSelected()
    {
      if(this.formStep1.platform.length > 0){
        this.formStep1.platform.map(item => this.selectedPlatforms.push(item.value))

      }
    },
    getPlatforms()
    {
      Api.GetPlatforms().then(response =>{

        response.data.map(item => this.selectData.push(
          {
            label: item.title,
            value: item.id
          }
        ))
        this.getLead()

      })
    },
    getLead()
    {
      Api.GetLead(this.userId).then(response =>{

        if(response.data.error){
          this.errorMessage = response.data.error
          this.destination = 'Voltar a lista de leads'
          this.path= '/app/leads'
          this.$notify('error', 'Erro ao selecionar a Lead', response.data.error, { duration: 5000, permanent: false });
          return;
        }

        if(response.data.lead.status === 'converted'){
          this.errorMessage = `A lead  ${response.data.lead.name} já foi convertida.`
          this.destination = 'Aceder ao perfil do cliente'
          this.path= `/app/client/edit-client/${response.data.lead.id}`
          this.$notify('error', 'Lead convertida', 'Esta lead já foi convertida', { duration: 3000, permanent: false });
          this.canRender = false
          return
        }

        this.clientId = response.data.lead.id;
        this.formStep1.name = response.data.lead.name;
        this.formStep1.email = response.data.lead.email;
        this.formStep1.phone = response.data.lead.phone;
        this.canRender = true
      },error =>{
        console.log(error)
      })
    },
    getPlans()
    {
      Api.GetPlans().then(response =>{

        response.data.filter(item => {
          if(this.selectedPlatforms.includes(item.service_id))
          {
            this.planData.push(
              {
                label: item.title,
                value: item.id
              }
            )
          }
        })

      },error =>{
        console.log(error)
      })
    }
  },
  created()
  {
    this.getPlatforms()
  }
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
