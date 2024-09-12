<template>
  <div>
    <h4 class="mt-10 mb-3 md:text-h2 underline underline-offset-8">Payment</h4>
    <h5 class="text-black/50 my-5">Click payment button below to continue</h5>
    <button
      type="button"
      class="text-white bg-brightYellow py-3 rounded-md font-normal w-full flex justify-center"
      @click="handleConfirmOrder"
    >
      <img :src="isFormValid ? unlock : lock" alt="lock" class="mr-2.5 w-5" />
      Confirm Order
    </button>
    <div class="mt-4 text-black/50 text-sm mb-16 ">
      <p>
        *To simulate your payment later, before confirmed your order access <a target="_blank" class="hover:underline text-blue-600" href="https://simulator.sandbox.midtrans.com/">midtrans payment simulator</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import lock from '@/assets/images/lock.png'
import unlock from '@/assets/images/unlock.png'
import useCartStore from '@/stores/cartStore'
import { computed, onMounted } from 'vue'

const emits = defineEmits(['validate'])
const cartStore = useCartStore()

const props = defineProps({
  customerInformation: {
    type: Object,
    required: true
  }
})

// Fungsi untuk memeriksa apakah semua form customer information sudah valid (kecuali notes)
const isFormValid = computed(() => {
  const { email, firstName, lastName, country, province, city, postcode, streetAddress, phone } = props.customerInformation
  return (
    email && firstName && lastName && country && province && city && postcode && streetAddress && phone
  )
})

// Utilitas untuk memotong nama item
const truncateItemName = (name) => {
  return name.length > 50 ? name.substring(0, 47) + '...' : name
}

// Utilitas untuk membuat ID acak
const generateRandomId = (length) => {
  return Math.random().toString(36).substr(2, length)
}

// Membuat order data dari cart dan informasi pelanggan
const createOrderData = () => {
  return {
    orderID: generateRandomId(10),
    amount: cartStore.totalCartPrice,
    itemDetails: cartStore.cart.map((item) => ({
      id: item._id,
      quantity: item.quantity,
      price: item.price,
      name: truncateItemName(item.name)
    })),
    customerDetails: {
      first_name: props.customerInformation.firstName,
      last_name: props.customerInformation.lastName,
      email: props.customerInformation.email,
      phone: props.customerInformation.phone,
      billing_address: formatAddress(props.customerInformation),
      shipping_address: formatAddress(props.customerInformation)
    }
  }
}

// Format data alamat pelanggan
const formatAddress = (customerInfo) => {
  return {
    first_name: customerInfo.firstName,
    last_name: customerInfo.lastName,
    email: customerInfo.email,
    phone: customerInfo.phone,
    address: customerInfo.streetAddress,
    city: customerInfo.city,
    postal_code: customerInfo.postcode,
    country_code: 'IDN'
  }
}

// Fungsi untuk mengkonfirmasi order
const handleConfirmOrder = async () => {
  emits('validate')
  try {
    const orderData = createOrderData()
    const AUTH_STRING = btoa(`${import.meta.env.VITE_APP_MIDTRANS_SERVER_KEY}:`)

    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${AUTH_STRING}`
      },
      body: JSON.stringify(orderData)
    })
    const data = await response.json()

    if (data.token) {
      window.snap.pay(data.token, {
        onSuccess(result) {
          console.log('Payment successful:', result)
          cartStore.clearCart() // Menghapus cart
          window.location.href = '/checkout/success'
        },
        onPending(result) {
          console.log('Payment pending:', result)
        },
        onError(result) {
          console.error('Payment error:', result)
        },
        onClose() {
          console.log('Payment popup closed without finishing the transaction')
        }
      })
    }
  } catch (error) {
    console.error('Error confirming order: ', error)
  }
}

// Memuat skrip Snap.js
const loadSnapScript = () => {
  const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
  const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY

  const script = document.createElement('script')
  script.src = snapScript
  script.setAttribute('data-client-key', clientKey)
  script.async = true

  document.body.appendChild(script)
}

onMounted(() => {
  loadSnapScript()
})
</script>
