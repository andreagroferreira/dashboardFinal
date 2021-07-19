<template>
<b-card @click.prevent="toggleItem($event,data.client.id)" :class="{'active' : selectedItems.includes(data.client.id)}" no-body>
    <div class="position-relative">
        <router-link :to="`?p=${data.client.id}`" class="w-40 w-sm-100">
            <img :src="data.plataform.thumb" class="card-img-top" :alt="data.client.name" />
        </router-link>
        <b-badge pill :variant="data.statusColor" class="position-absolute badge-top-left">{{ data.client.status }}</b-badge>
    </div>
    <b-card-body>
        <b-row>
            <b-colxx xxs="2">
                <b-form-checkbox :checked="selectedItems.includes(data.client.id)" class="itemCheck mb-0" />
            </b-colxx>
            <b-colxx xxs="10" class="mb-3">
                <h6 class="mb-4 card-subtitle">{{data.client.name}}</h6>
                <p class="text-muted text-small mb-0 font-weight-light card-text">{{moment(data.client.created_at).format('DD-MM-YYYY')}}</p>
            </b-colxx>
        </b-row>
    </b-card-body>
</b-card>
</template>

<script>
export default {
    props: ['data', 'selectedItems'],
    methods: {
        toggleItem(event, itemId) {
            this.$emit('toggle-item', event, itemId)
        }
    }
}
</script>
