import { createApp } from 'vue'

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

// Home page should show summary of urgent tasks, chats and calendar
createApp(App).use(router).use(vuetify).mount('#app')