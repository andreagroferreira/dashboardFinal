<template>
  <b-modal id="deleteModal" ref="deleteModal" title="Eliminar Leads">
    <p v-if="numberLeads > 0"> Esta ação vai apagar {{numberLeads}} Leads. Esta ação é irreversivel.</p>
    <p v-else>Não tem nenhuma lead selecionada</p>
    <template slot="modal-footer">
      <b-button v-if="numberLeads > 0" variant="primary" @click="deleteLeads"  class="mr-1">Eliminar Leads</b-button>
      <b-button variant="secondary" @click="hideModal('deleteModal')">Fechar</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "DeleteModal",
  props:['deleteLeads','numberLeads'],
  methods:{
    hideModal(refname) {
      this.$refs[refname].hide();
    },
  }
}
</script>

<style scoped>

</style>
