import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from "vue-i18n";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import '@/assets/main.scss'

import App from '@/App.vue'
import router from '@/router'
import BaseButton from '@/components/ui/BaseButton.vue'
import Loader from '@/components/Loader.vue'

import ru from '@/assets/i18n/ru'
import tj from '@/assets/i18n/tj'

const i18n = createI18n({
  globalInjection: true,
  locale: localStorage.getItem('lang'),
  legacy: false,
  messages: {
    ru: ru,
    tj: tj
  }
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(Toast)
app.use(router)
app.component('BaseButton', BaseButton)
app.component('Loader', Loader)

app.mount('#app')
