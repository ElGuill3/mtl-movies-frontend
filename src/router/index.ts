import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SectionView from '../views/SectionView.vue'
import PlayerView from '../views/PlayerView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/section/:type',
      name: 'section',
      component: SectionView,
      props: true,
    },
    {
      path: '/player/:id',
      name: 'player',
      component: PlayerView,
      props: true,
    },
  ],
})

export default router