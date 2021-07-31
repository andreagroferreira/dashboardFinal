<template>
  <b-card title="Leads Convertidas">
    <vue-perfect-scrollbar
      class="scroll dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <recent-order-item
        v-if="leadsConverted.length > 0"
        v-for="(order,index) in leadsConverted.slice(0,6)"
        :order="order"
        detail-path="#"
        :key="index"
      />

    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import RecentOrderItem from "../../components/Listing/RecentOrderItem";
import products from "../../data/products";

export default {
  components: {
    "recent-order-item": RecentOrderItem
  },
  props:{
    leadsConverted:{
      type: Array,
      required: true
    }
  },
  data() {
    return {
      products
    };
  },
  methods: {
    refreshButtonClick() {
      console.log("refreshButtonClick");
    }
  }
};
</script>
