<template>
  <b-modal
    id="modalright"
    ref="modalright"
    title="Criar Lead"
    modal-class="modal-right"
  >
    <b-form>
      <b-form-group label="Nome">
        <b-form-input v-model="newItem.name" />
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input v-model="newItem.email" />
      </b-form-group>
      <b-form-group label="Contacto">
        <b-form-input v-model="newItem.phone" />
      </b-form-group>
      <b-form-group label="Plataforma">
        <v-select :options="categories" v-model="newItem.platform"/>
      </b-form-group>
      <b-form-group label="Estado">
        <b-form-radio-group stacked class="pt-2" :options="statuses" v-model="newItem.status" />
      </b-form-group>
    </b-form>

    <template slot="modal-footer">
      <b-button
        variant="outline-secondary"
        @click="hideModal('modalright')"
      >Cancelar</b-button>
      <b-button variant="primary" @click="addNewLead()" class="mr-1">Criar Lead</b-button>
    </template>
  </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {mapGetters} from "vuex";
import Api from "@/services/Api";
export default {
  components: {
    "v-select": vSelect
  },
  props: ["categories", "statuses"],
  data() {
    return {
      newItem: {
        name: "",
        platform: "",
        email: "",
        status: "",
        phone: "",
      }
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
    })
  },
  methods: {
    addNewLead() {
      this.newItem.user_id = this.currentUser.user.id
      Api.CreateLead(this.newItem).then(result =>{

        if(result.data.error)
        {
          this.$notify('error', 'Erro ao registar', result.data.error, { duration: 3000, permanent: false });
          return
        }

        this.$notify('success', 'Lead registada', result.data.success, { duration: 3000, permanent: false });
      },(error) =>{

        console.log(error)

      })
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },

  }
};
</script>

