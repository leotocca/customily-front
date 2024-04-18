import { createRouter, createWebHistory } from 'vue-router'
import PageList from '../views/PageList.vue'
import PageDetail from '../views/PageDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'page-list',
      component: PageList
    },
    {
      path: '/images',
      name: 'images',
      component: PageDetail
    }
  ]
})

export default router
