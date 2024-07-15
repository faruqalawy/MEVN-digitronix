<template>
  <div>
    <h4 class="mt-10 mb-3 md:text-h2 underline underline-offset-8">Customer Information</h4>
    <form class="grid grid-cols-6 gap-2.5 mt-7">
      <input
        type="text"
        v-model="localCustomerInformation.email"
        placeholder="Your Email*"
        class="col-span-6"
        required
      />
      <input
        type="text"
        v-model="localCustomerInformation.firstName"
        placeholder="First Name*"
        class="col-span-3"
        required
      />
      <input
        type="text"
        v-model="localCustomerInformation.lastName"
        placeholder="Last Name*"
        class="col-span-3"
        required
      />
      <input
        type="text"
        v-model="localCustomerInformation.country"
        placeholder="Country / Region*"
        class="col-span-6"
        required
      />
      <input
        type="text"
        v-model="localCustomerInformation.streetAddress"
        placeholder="Street Address*"
        class="col-span-3"
        required
      />
      <input
        type="text"
        v-model="localCustomerInformation.unit"
        placeholder="Unit, rt, rw, etc"
        class="col-span-3"
      />
      <input
        type="text"
        v-model="localCustomerInformation.province"
        placeholder="Province*"
        class="col-span-2"
        required
      />
      <input
        type="text"
        v-model="localCustomerInformation.city"
        placeholder="Town / City*"
        class="col-span-2"
        required
      />
      <input
        type="text"
        v-model="localCustomerInformation.postcode"
        placeholder="Postcode / ZIP*"
        class="col-span-2"
        required
      />
      <input
        type="text"
        v-model="localCustomerInformation.phone"
        placeholder="Your Phone Number*"
        class="col-span-6"
        required
      />
      <textarea
        type="text"
        v-model="localCustomerInformation.notes"
        placeholder="Notes? Instructions? Special requests? add them here..."
        class="col-span-6"
        rows="5"
      ></textarea>
    </form>
  </div>
</template>

<script setup>
import {  watch, reactive } from 'vue'

const props = defineProps({
  customerInformation: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['update:customerInformation'])

const localCustomerInformation = reactive({ ...props.customerInformation })

watch(localCustomerInformation, (newVal) => {
  emits('update:customerInformation', newVal)
})
</script>

<style scoped>
input,
textarea {
  @apply border border-[lightGray] px-3 md:px-5 py-3 md:py-5 text-h6 md:text-h5 rounded-md;
}
</style>
