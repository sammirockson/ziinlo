import { createApp } from 'vue'
import mitt from 'mitt'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'

// Components
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})

// we need to provide it to the app to be used globally
const eventBus = mitt();
// Home page should show summary of urgent tasks, chats and calendar
createApp(App).use(router).use(vuetify).provide('eventBus', eventBus).mount('#app')