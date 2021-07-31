<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Perfil Cliente" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <edit-form :userId="client"></edit-form>
  </div>
</template>
<script>
import EditForm from "@/containers/clients/EditForm";
export default {
  components: {
    "edit-form": EditForm,
  },
  props:['client'],

};
</script>
