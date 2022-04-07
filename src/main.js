import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//bootstrap 설정 추가
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

createApp(App).use(store).use(router).mount('#app')
