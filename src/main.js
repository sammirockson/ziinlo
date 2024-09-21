import { createApp } from 'vue'
import mitt from 'mitt'
import VueCryptojs from 'vue-cryptojs'
// import PrimeVue from 'primevue/config';
// import PrimeVueStyled from 'primevue/config';


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
import App from './App.vue'

import PrimeVue from 'primevue/config';
// import Aura from '@primevue/themes/aura';
// import Aura from '@primevue/themes/aura';

import ElementPlus from 'element-plus';
import ElementTiptapPlugin from 'element-tiptap';
// import ElementTiptap's styles
import 'element-tiptap/lib/style.css';

const vuetify = createVuetify({
    components,
    directives
})

// we need to provide it to the app to be used globally
const eventBus = mitt();
// Home page should show summary of urgent tasks, chats and calendar
// .use(PrimeVue, {
//     theme: {
//         preset: Aura,
//         darkModeSelector: 'system',
//     }
// })
createApp(App).use(PrimeVue, {
    unstyled: true
    // theme: {
    //     preset: Aura
    // }
})
.use(ElementPlus).use(ElementTiptapPlugin).use(router)
.use(vuetify).use(VueCryptojs).provide('eventBus', eventBus)
.mount('#app')

// .my-app-dark        darkModeSelector: 'system',
