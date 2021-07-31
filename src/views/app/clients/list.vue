<template>
  <b-row>
    <b-colxx  class="disable-text-selection">
      <list-page-heading
        title="Lista de Clientes"
        :selectAll="selectAll"
        :deleteClients="deleteClients"
        :numberLeads="selectedItems.length"
        :filterByService = "filterByPlatform"
        :seviceActive = "service_id"
        :isSelectedAll="isSelectedAll"
        :isAnyItemSelected="isAnyItemSelected"
        :keymap="keymap"
        :displayMode="displayMode"
        :changeDisplayMode="changeDisplayMode"
        :changeOrderBy="changeOrderBy"
        :changePageSize="changePageSize"
        :sort="sort"
        :searchChange="searchChange"
        :from="from"
        :to="to"
        :total="total"
        :perPage="perPage"
      ></list-page-heading>
      <template v-if="isLoad">
        <div v-if="error" class="col-12 text-center"><h2>Não existem Resultados</h2></div>
        <list-page-listing
          v-if="!error"
          :displayMode="displayMode"
          :items="items"
          :selectedItems="selectedItems"
          :toggleItem="toggleItem"
          :lastPage="lastPage"
          :perPage="perPage"
          :page="page"
          :changePage="changePage"
          :handleContextMenu="handleContextMenu"
          :onContextMenuAction="onContextMenuAction"
        ></list-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import Api from '@/services/Api'
import ListPageHeading from "@/containers/clients/ListPageHeading";
import ListPageListing from "@/containers/clients/ListPageListing";

export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing
  },
  data() {
    return {
      isLoad: false,
      error: false,
      displayMode: "thumb",
      sort: {
        column: "created_at",
        label: "Data"
      },
      page: 1,
      perPage: 100,
      search: "",
      service_id: 0,
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      selectedItems: []
    };
  },
  methods: {
    loadItems() {
      this.isLoad = false
      Api.GetListClients(this.page,this.perPage,this.perPage,this.sort.column,this.service_id).then(result =>{
        console.log(result)
        if(result.data.error)
        {
          this.isLoad = true
          this.error= true
          return;
        }
        this.items = result.data.data
        this.total = result.data.total
        this.from = result.data.from;
        this.to = result.data.to;
        this.perPage = result.data.per_page;
        this.selectedItems = [];
        this.lastPage = result.data.last_page;
        this.isLoad = true
        this.error= false

      },error =>{
        console.log(error)
        this.isLoad = true
        this.error= true
      })
    },
    searchLeads()
    {
      this.isLoad = false
      Api.SearchListClients(this.page,this.perPage,this.perPage,this.service_id,this.search).then(result =>{
        console.log(result)
        this.items = result.data.data
        this.total = result.data.total
        this.from = result.data.from;
        this.to = result.data.to;
        this.perPage = result.data.per_page;
        this.selectedItems = [];
        this.lastPage = result.data.last_page;
        this.isLoad = true
        this.error= false
      },error =>{
        console.log(error)
        this.isLoad = true
        this.error= true
    })
    },
    changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
      this.loadItems()
    },
    changeOrderBy(sort) {
      this.sort = sort;
      this.loadItems()
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
      if(this.search.length >= 3){
        this.searchLeads()
      }
      if(this.search.length <= 0){
        this.loadItems()
      }
    },
    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.client.id);
      }
    },
    deleteClients()
    {
      if(this.selectedItems.length > 0){
        Api.DestroyClients(this.selectedItems).then(result =>{
          if(result.data.error)
          {
            this.$notify('error', 'Erro ao registar', result.data.error, { duration: 3000, permanent: false });
            return
          }
          this.$bvModal.hide('deleteModal')
          this.$notify('success', 'Cliente(s) Eliminado(s) com sucesso', result.data.success, { duration: 3000, permanent: false });
          this.loadItems()
        },(error) =>{
          console.log(error)
        })
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    toggleItem(event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        let start = this.getIndex(itemId, itemsForToggle, "id");
        let end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    handleContextMenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    },
    changePage(pageNum) {
      this.page = pageNum;
      this.loadItems();
    },
    filterByPlatform(id)
    {
      this.service_id = id
      this.loadItems();
    }
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
  },
  watch: {
    search() {
      this.page = 1;
    },
    changePage()
    {

      return this.page
    },
  },
  mounted() {
    this.loadItems();
  }
};
</script>
