// import './assets/main.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import Breadcrumb from 'primevue/breadcrumb'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import MainModel from './components/MainModel.vue'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark'
    }
  }
})
app.use(ToastService)
app.component('BreadCrumb', Breadcrumb)

//model
app.use('main-model', MainModel)

app.mount('#app')
