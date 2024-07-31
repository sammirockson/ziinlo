import { createApp } from 'vue'
import mitt from 'mitt'
import VueCryptojs from 'vue-cryptojs'
import PrimeVue from 'primevue/config';
import PrimeVueStyled from 'primevue/config';
import Button from 'primevue/editor';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives
})

// we need to provide it to the app to be used globally
const eventBus = mitt();
// Home page should show summary of urgent tasks, chats and calendar
createApp(App).use(PrimeVue).use(PrimeVueStyled).use(router).use(vuetify).use(VueCryptojs).provide('eventBus', eventBus).mount('#app')