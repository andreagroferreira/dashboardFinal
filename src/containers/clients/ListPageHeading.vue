<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
        <b-button
          v-b-modal.modalright
          variant="primary"
          size="lg"
          class="top-right-button"
        >Criar Lead</b-button>
        <b-button-group>
          <b-dropdown split right @click="selectAll(true)" class="check-button" variant="primary">
            <label
              class="custom-control custom-checkbox pl-4 mb-0 d-inline-block"
              slot="button-content"
            >
              <input
                class="custom-control-input"
                type="checkbox"
                :checked="isSelectedAll"
                v-shortkey="{select: ['ctrl','a'], undo: ['ctrl','d']}"
                @shortkey="keymap"
              />
              <span
                :class="{
                'custom-control-label' :true,
                'indeterminate' : isAnyItemSelected
                }"
              >&nbsp;</span>
            </label>
            <b-dropdown-item v-b-modal.deleteModal>Eliminar Leads</b-dropdown-item>
            <b-dropdown-item>Alterar Estado</b-dropdown-item>
          </b-dropdown>
        </b-button-group>
      </div>
      <add-new-modal v-if="render" :categories="categories" :statuses="statuses"></add-new-modal>
      <delete-modal :delete-leads="deleteLead" :number-leads="numberLeads"></delete-modal>
      <piaf-breadcrumb />
      <div class="mb-2 mt-2">
        <b-button
          variant="empty"
          class="pt-0 pl-0 d-inline-block d-md-none"
          v-b-toggle.displayOptions
        >
          {{ $t('pages.display-options') }}
          <i class="simple-icon-arrow-down align-middle" />
        </b-button>
        <b-collapse id="displayOptions" class="d-md-block">
          <span class="mr-3 d-inline-block float-md-left">
            <a
              :class="{'mr-2 view-icon':true,'active': displayMode==='list'}"
              @click="changeDisplayMode('list')"
            >
              <data-list-icon />
            </a>
            <a
              :class="{'mr-2 view-icon':true,'active': displayMode==='thumb'}"
              @click="changeDisplayMode('thumb')"
            >
              <thumb-list-icon />
            </a>
          </span>
          <div class="d-block d-md-inline-block pt-1">
            <b-dropdown
              id="ddown1"
              :text="`${$t('pages.orderby')} ${sort.label}`"
              variant="outline-dark"
              class="mr-1 float-md-left btn-group"
              size="xs"
            >
              <b-dropdown-item
                v-for="(order,index) in sortOptions"
                :key="index"
                @click="changeOrderBy(order)"
              >{{ order.label }}</b-dropdown-item>
            </b-dropdown>

            <div class="search-sm d-inline-block float-md-left mr-1 align-top">
              <b-input placeholder="Procurar"  @input="(val) => searchChange(val)" />
            </div>
            <div class="d-inline-block float-md-left ml-1 my-sm-3 my-md-1 align-top">
              <b-badge  class="mb-1 mr-2"  @click="filterByService(0)" pill :variant="seviceActive === 0 ? 'outline-info' : 'outline-dark'">Todas</b-badge>
              <b-badge v-for="item in categories" :key="item.value" class="mb-1 mr-2"  @click="filterByService(item.value)" pill :variant="seviceActive === item.value ? 'outline-info' : 'outline-dark'">{{ item.label }}</b-badge>
            </div>

          </div>
          <div class="float-md-right pt-1">
            <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} de {{ total }}</span>
            <b-dropdown
              id="ddown2"
              right
              :text="`${perPage}`"
              variant="outline-dark"
              class="d-inline-block"
              size="xs"
            >
              <b-dropdown-item
                v-for="(size,index) in pageSizes"
                :key="index"
                @click="changePageSize(size)"
              >{{ size }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-collapse>
      </div>
      <div class="separator mb-5" />
    </b-colxx>
  </b-row>
</template>
<script>
import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon
} from "../../components/Svg";
import AddNewModal from "./AddNewModal";
import Api from '@/services/Api'
import DeleteModal from "@/containers/pages/DeleteModal";
export default {
  components: {
    "data-list-icon": DataListIcon,
    "thumb-list-icon": ThumbListIcon,
    "image-list-icon": ImageListIcon,
    "add-new-modal": AddNewModal,
    "delete-modal": DeleteModal
  },
  props: [
    "title",
    "selectAll",
    "isSelectedAll",
    "isAnyItemSelected",
    "keymap",
    "displayMode",
    "changeDisplayMode",
    "changeOrderBy",
    "changePageSize",
    "sort",
    "searchChange",
    "from",
    "to",
    "total",
    "perPage",
    "deleteLead",
    "numberLeads",
    "filterByService",
    "seviceActive"
  ],
  data() {
    return {
      render: false,
      categories: [],
      statuses: [
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
      ],
      sortOptions: [
        {
          column: "name",
          label: "Nome"
        },
        {
          column: "created_at",
          label: "Date"
        }
      ],
      pageSizes: [4, 8, 12,20,30,100,200]
    };
  },
  methods:
  {
    getPlatforms()
    {
      Api.GetPlatforms().then(response =>{

        response.data.map(item => this.categories.push(
          {
            label: item.title,
            value: item.id
          }
        ))

        this.render = true

      })
    }
  },
  created()
  {
    this.getPlatforms()
  }
};
</script>
