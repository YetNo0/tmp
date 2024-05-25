import './assets/index.css'
import { createWebHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'

import PracticaseNo5 from './pages/PracticaseNo5.vue'
import PracticaseNo6 from './pages/PracticaseNo6.vue'
import PracticaseNo7 from './pages/PracticaseNo7.vue'
import LaboratoryNo5 from './pages/LaboratoryNo5.vue'
import LaboratoryNo6 from './pages/LaboratoryNo6.vue'
import LaboratoryNo7 from './pages/LaboratoryNo7.vue'
import LaboratoryNo9 from './pages/LaboratoryNo9.vue'

const routes = [
    { path: '/pr_no_5', component: PracticaseNo5 },
    { path: '/pr_no_6', component: PracticaseNo6 },
    { path: '/pr_no_7', component: PracticaseNo7 },
    { path: '/lr_no_5', component: LaboratoryNo5 },
    { path: '/lr_no_6', component: LaboratoryNo6 },
    { path: '/lr_no_7', component: LaboratoryNo7 },
    { path: '/lr_no_9', component: LaboratoryNo9 }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
