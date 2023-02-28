import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import 'vue-select/dist/vue-select.css';
import './assets/main.scss'


import App from './App.vue'
import router from './router'
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import BaseButton from './components/ui/BaseButton.vue'
import Loader from './components/Loader.vue'

const app = createApp(App)
app.use(createPinia())
app.use(Toast)
app.use(router)
app.component('Aside', Aside)
app.component('Header', Header)
app.component('BaseButton', BaseButton)
app.component('Loader', Loader)


app.mount('#app')
