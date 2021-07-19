<template>
<b-card @click.prevent="toggleItem($event,data.client.id)" :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.client.id)}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
        <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <router-link :to="`/app/clients/edit-client/${data.client.id}`" class="w-40 w-sm-100">
                <p class="list-item-heading mb-0 truncate">{{data.client.name}}</p>
            </router-link>
          <p class="mb-0 mr-2 text-muted text-small w-15 w-sm-100"><a :href="'tel:'+data.client.phone">{{data.client.phone}}</a></p>
          <p class="mb-0 mr-2 text-muted text-small w-15 w-sm-100"><a :href="'mailto:'+data.client.email">{{data.client.email}}</a></p>
            <p class="mb-0 text-muted text-small w-15 w-sm-100">{{data.plataform.title}}</p>
            <p class="mb-0 text-muted text-small w-15 w-sm-100">{{moment(data.client.created_at).format('DD-MM-YYYY')}}</p>
            <div class="w-15 w-sm-100">
                <b-badge pill :variant="defineStatusPill(data.client.status)">{{ translateStatusUi(data.client.status) }}</b-badge>
            </div>
        </div>
        <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <b-form-checkbox :checked="selectedItems.includes(data.client.id)" class="itemCheck mb-0" />
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
            return 'warning'
            break;
          case 'disable':
            return 'danger'
            break;
          case 'active':
            return 'success'
            break;
          default:
            return 'primary'
          }

        },
        translateStatusUi(status)
        {

          switch(status) {
            case 'pending':
            return 'Ainda não fez Login'
            break;
          case 'disable':
            return 'Cliente Cancelado'
            break;
          case 'active':
            return 'Cliente Activo'
            break;
          default:
            return 'Estado nao definido'
          }

        }

    }
}
</script>
