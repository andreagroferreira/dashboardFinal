<template>
  <div class="icon-cards-row">
    <glide-component :settings="glideIconsOption">
      <icon-card title="Leads Pendentes" :icon="pendingLeads > 0 ? 'iconsminds-repeat-5' : 'iconsminds-record-2'" :value="pendingLeads" />
      <icon-card
        title="Leads Convertidas"
        :icon="convertedLeads > 0 ? 'iconsminds-money-bag' : 'iconsminds-receipt-4'"
        :value="convertedLeads"
      />
      <icon-card
        title="Leads Novas"
        icon="iconsminds-arrow-refresh"
        :value="newLeads"
      />
      <icon-card title="Tasks Abertas" :icon="openTasks > 0 ? 'iconsminds-box-full' : 'iconsminds-empty-box'" :value="openTasks" />
    </glide-component>
  </div>
</template>
<script>
import GlideComponent from "../../components/Carousel/GlideComponent";
import IconCard from "../../components/Cards/IconCard";

export default {
  components: {
    "glide-component": GlideComponent,
    "icon-card": IconCard
  },
  props:{
    pendingLeads:{
      type: Number,
      required: true
    },
    convertedLeads:{
      type: Number,
      required: true
    },
    openTasks:{
      type: Number,
      required: true
    },
    newLeads:{
      type: Number,
      required: true
    }
  },
  data() {
    return {
      glideIconsOption: {
        gap: 5,
        perView: 4,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1
          },
          576: {
            perView: 2
          },
          1600: {
            perView: 3
          },
          1800: {
            perView: 4
          }
        },
        hideNav: true
      }
    };
  }
};
</script>
