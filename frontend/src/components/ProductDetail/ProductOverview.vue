<template>
  <div v-if="error" class="text-red-500 text-center text-h2 my-5">
    failed to render: {{ error }}
  </div>

  <div v-if="isLoading">
    <LoadSpinner />
  </div>

  <div v-if="product" class="mt-12 lg:grid lg:grid-cols-2">
    <img :src="product.image" :alt="product.name" class="w-full mb-5" />
    <div class="lg:ml-5">
      <h5 class="md:text-h3">{{ product.name }}</h5>
      <h5 class="text-brightYellow md:text-h3">Rp {{ currencyFormat(product.price) }}</h5>
      <div class="my-5">
        <h5 class="mb-2 md:text-h4">Key Features:</h5>
        <ul class="text-h6 text-black/60 gap-1 flex flex-col list-disc ms-6 md:text-h5">
          <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>
      <div class="flex flex-col gap-3">
        <h5>How much will you buy?</h5>
        <div class="flex items-center max-w-48 border rounded-md overflow-hidden">
          <button
            class="bg-red-500/60 hover:bg-red-500 text-white px-4 py-2 focus:outline-none"
            @click="handleDecrement"
          >
            -
          </button>
          <input
            type="number"
            class="w-full text-center border-none focus:outline-none appearance-none"
            v-model="quantity"
          />
          <button
            class="bg-green-500/60 hover:bg-green-500 text-white px-4 py-2 focus:outline-none"
            @click="handleIncrement"
          >
            +
          </button>
        </div>

        <button
          type="button"
          class="text-white bg-brightYellow py-2.5 w-48 rounded-md font-normal"
          @click="handleAddToCart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import LoadSpinner from '../Other/LoadSpinner.vue'
import getCategories from '@/composable/getCategories'
import { currencyFormat } from '@/utils/CurrencyFormat'
import { useAuthStatus } from '@/composable/useAuthStatus'
import { toast } from 'vue3-toastify'

const cartStore = useCartStore()
const { categories, error, isLoading, loadCategories } = getCategories()
const { isLoggedIn } = useAuthStatus()
const product = ref(null)
const quantity = ref(1)

const route = useRoute()
const productName = ref(route.params.productName)

function handleIncrement() {
  quantity.value++
}

function handleDecrement() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function handleAddToCart() {
  if (isLoggedIn.value) {
    const existingProduct = cartStore.cart.find((item) => item.name === product.value.name)
    if (existingProduct) {
      cartStore.updateQuantity(existingProduct._id, existingProduct.quantity + quantity.value)
      toast.success('Product quantity has been updated.', {
        autoClose: 5000,
        theme: 'colored',
        position: 'top-center',
        pauseOnHover: false
      })
    } else {
      const newCartItem = {
        name: product.value.name,
        price: product.value.price,
        quantity: quantity.value,
        image: product.value.image
      }
      cartStore.addToCart(newCartItem)
    }
    quantity.value = 1 // Reset quantity to 1 after adding to cart
  } else {
    toast.error('Please sign in to add products to the cart.', {
      autoClose: 5000,
      theme: 'colored',
      position: 'top-center',
      pauseOnHover: false
    })
  }
}

const loadProduct = () => {
  if (categories.value.length > 0) {
    for (const category of categories.value) {
      const foundProduct = category.products.find((prod) => prod.name === productName.value)
      if (foundProduct) {
        product.value = foundProduct
        break
      }
    }
  }
}

onMounted(async () => {
  await loadCategories()
  loadProduct()
})

watch(
  () => route.params.productName,
  (newProductName) => {
    productName.value = newProductName
    loadProduct()
  }
)
</script>
