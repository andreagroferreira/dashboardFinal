<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Conversão Lead" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-5">
        <h5 class="mb-4">Formulário de Conversão</h5>
        <convert-form :userId="lead"></convert-form>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>

import ConvertForm from "@/containers/pages/ConvertForm";
import Api from "@/services/Api";
export default {
  components: {
    "convert-form": ConvertForm,
  },
  props:['lead']
};
</script>

