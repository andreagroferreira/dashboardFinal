<template>
<b-card @click.prevent="toggleItem($event,data.leads.id)" :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.leads.id)}" no-body>
    <router-link :to="`/app/leads/edit-lead/${data.leads.id}`" class="d-flex">
        <img :src="data.plataform.thumb" class="list-thumbnail responsive border-0" style="width:113px !important; height:85px !important;object-fit: contain !important;" :alt="data.leads.name" />
    </router-link>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <router-link :to="`/app/leads/edit-lead/${data.leads.id}`" class="w-40 w-sm-100">
                <p class="list-item-heading mb-0 truncate">{{data.leads.name}}</p>
            </router-link>
          <p class="mb-0 mr-2 text-muted text-small w-15 w-sm-100"><a :href="'tel:'+data.leads.phone">{{data.leads.phone}}</a></p>
          <p class="mb-0 mr-2 text-muted text-small w-15 w-sm-100"><a :href="'mailto:'+data.leads.email">{{data.leads.email}}</a></p>
            <p class="mb-0 text-muted text-small w-15 w-sm-100">{{data.plataform.title}}</p>
            <p class="mb-0 text-muted text-small w-15 w-sm-100">{{moment(data.leads.created_at).format('DD-MM-YYYY')}}</p>
            <div class="w-15 w-sm-100">
                <b-badge pill :variant="defineStatusPill(data.leads.status)">{{ translateStatusUi(data.leads.status) }}</b-badge>
            </div>
        </div>
        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <b-form-checkbox :checked="selectedItems.includes(data.leads.id)" class="itemCheck mb-0" />
        </div>
    </div>
</b-card>
</template>

<script>
export default {
    props: ['data', 'selectedItems'],
    methods: {
        toggleItem(event, itemId) {
            this.$emit('toggle-item', event, itemId)
        },
      defineStatusPill(status)
      {
        switch(status) {
          case 'pending':
            return 'success'
            break;
          case 'unsubscribe':
            return 'danger'
            break;
          case 'contacted':
            return 'warning'
            break;
          case 'contactLater':
            return 'secondary'
            break;
          default:
            return 'primary'
        }

      },
      translateStatusUi(status)
      {

        switch(status) {
          case 'pending':
            return 'Nova Lead'
            break;
          case 'unsubscribe':
            return 'Negócio não fechado'
            break;
          case 'contacted':
            return 'Contactado'
            break;
          case 'contactLater':
            return 'Contactar mais tarde'
            break;
          default:
            return 'Estado nao definido'
        }

      }
    }
}
</script>
