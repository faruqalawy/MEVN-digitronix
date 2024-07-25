<template lang="">
    <div class="mt-8">
      <h4 class="md:text-h2">More about the product</h4>
      <h1 class="text-h6 text-black/60 mb-5 md:text-h5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </h1>
      <div
        class="w-full"
        :style="{
          backgroundImage: `linear-gradient(to top, rgba(109, 107, 107, 0.9) 0%, rgba(109, 107, 107, 0) 80%),
                        url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      >
        <div class="px-1 text-white text-center pt-56 pb-10 lg:pt-[420px] lg:pb-20">
          <h1 class="text-h6 mb-2 lg:text-h5">Bonorum et Malorum</h1>
          <h5 class="lg:text-h3">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium.
          </h5>
          <hr class="mt-5 mx-auto w-5 lg:w-10 border-t border-white" />
        </div>
      </div>
    </div>
</template>
<script setup>
import backgroundImage from '@/assets/images/product-detail-background.png'
</script>