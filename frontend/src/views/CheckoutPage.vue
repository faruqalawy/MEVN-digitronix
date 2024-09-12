<template>
  <div class="custom-display">
    <h3 class="mt-10 mb-3 md:text-h1">Checkout Page</h3>
    <div class="border-b-2 border-[#d9d9d9] hidden lg:block"></div>
  </div>
  <!-- this component used on small display, and will make background color for 'show your order' toggle excluded from 'custom-display' style -->
  <div class="lg:hidden">
    <CartSummary />
  </div>
  <div class="lg:grid lg:grid-cols-2 custom-display gap-10">
    <!-- rendering customer information two times required to make it show first in large display and vice versa -->
    <CustomerInformation
      ref="customerInfoRefLg"
      class="hidden lg:block"
      :customerInformation="customerInformation"
      @update:customerInformation="updateCustomerInformation"
    />
    <div class="hidden lg:block">
      <CartSummary />
    </div>
    <CustomerInformation
      ref="customerInfoRefSm"
      class="lg:hidden"
      :customerInformation="customerInformation"
      @update:customerInformation="updateCustomerInformation"
    />
    <PaymentMethod @validate="handleValidate" :customerInformation="customerInformation" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import CustomerInformation from '../components/Checkout/CustomerInformation.vue'
import CartSummary from '../components/Checkout/CartSummary.vue'
import PaymentMethod from '../components/Checkout/PaymentMethod.vue'
import { validateCustomerInformation } from '@/utils/FormValidation'

// Reactive reference to store customer information
const customerInformation = ref({
  email: '',
  firstName: '',
  lastName: '',
  country: '',
  streetAddress: '',
  unit: '',
  province: '',
  city: '',
  postcode: '',
  phone: '',
  notes: ''
})

// Refs to access customer information components in large and small screens
const customerInfoRefLg = ref(null)
const customerInfoRefSm = ref(null)

// Function to update customer information
const updateCustomerInformation = (newInfo) => {
  customerInformation.value = newInfo
}

// Function to handle form validation
const handleValidate = () => {
  // Validate customer information and payment method
  const errors = validateCustomerInformation(customerInformation.value)
  // const paymentErrors = validatePaymentMethod()

  // Check if there are any errors
  if (errors.length) {
    // Combine all errors into a single string
    const allErrors = [...errors].join('\n')
    // Display all errors in a single toast
    toast.error(allErrors, {
      autoClose: 5000,
      position: 'top-center'
    })
    // Scroll to the customer information section
    scrollToCustomerInformation()
  } 
  // else {
  //   // Display success message if no errors
  //   toast.success('Order confirmed successfully!')
  // }
}

// Function to scroll to the customer information section
const scrollToCustomerInformation = () => {
  // Get references to the customer information components
  const elementLg = customerInfoRefLg.value?.$el
  const elementSm = customerInfoRefSm.value?.$el

  // Scroll to the appropriate component based on screen size
  if (window.innerWidth >= 1024 && elementLg) {
    elementLg.scrollIntoView({ behavior: 'smooth' })
  } else if (elementSm) {
    elementSm.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
