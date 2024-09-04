import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue';
import ProductsByCategory from '../views/ProductsByCategory.vue';
import ProductDetail from '../views/ProductDetail.vue';
import CartPage from '../views/CartPage.vue';
import CheckoutPage from '../views/CheckoutPage.vue';
import SearchPage from '../views/SearchPage.vue';
import TestProductDetail from '@/components/ProductDetail/ProductOverview.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';

import { useAuthStore } from '@/stores/authStore';

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
      component: HomePage,
    },
    {
      path: '/category/:id',
      name: 'productsByCategory',
      component: ProductsByCategory,
      props: true,
    },
    {
      path: '/product/:productName',
      name: 'product-detail',
      component: ProductDetail,
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: TestProductDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
      props: route => ({query: route.query.q}),
    },
    {
      path: '/register',
      name:'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      redirect: '/'
    }
  ]
})

// Global route guard to make sure that pages with meta requiresAuth 
// just can be loaded by user that has been login already
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const currentUser = authStore.user || localStorage.getItem('currentUser')
  
  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    // Jika halaman memerlukan autentikasi dan pengguna belum login, arahkan ke halaman login
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
