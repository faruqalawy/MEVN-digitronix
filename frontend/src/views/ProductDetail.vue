<template>
  <div class="custom-display">
    <ProductOverview />
    <MoreDetail />
    <RelatedProduct />
  </div>
</template>
<script setup>
import ProductOverview from '../components/ProductDetail/ProductOverview.vue'
import MoreDetail from '../components/ProductDetail/MoreDetail.vue'
import RelatedProduct from '../components/ProductDetail/RelatedProduct.vue'
</script>
