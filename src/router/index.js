import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue';
import ProductsByCategory from '../views/ProductsByCategory.vue';
import ProductDetail from '../views/ProductDetail.vue';
import CartPage from '../views/CartPage.vue';
import CheckoutPage from '../views/CheckoutPage.vue';
import SearchPage from '../views/SearchPage.vue';

import TestProductDetail from '@/components/ProductDetail/ProductOverview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    } else {
      return {top: 0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/category/:id',
      name: 'productsByCategory',
      component: ProductsByCategory,
      props: true
    },
    {
      path: '/category/:categoryId/product/:productId',
      name: 'product-detail',
      component: ProductDetail,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage
    },
    {
      path: '/test',
      name: 'test',
      component: TestProductDetail
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
      props: route => ({query: route.query.q})
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      redirect: '/'
    }
  ]
})

export default router
