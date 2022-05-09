import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//bootstrap 설정 추가
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

//google map api 추가
import VueGoogleMaps from '@fawmi/vue-google-maps'

createApp(App)
.use(store)
.use(router)
.use(VueGoogleMaps, 
{
    load: {
        key: 'AIzaSyDd4q1fnJ_2BBXJo8TgMA1-0Csgf_y6Ya8',
    },
    autobindAllEvents: true,
})
.mount('#app')
