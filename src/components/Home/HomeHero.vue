<template>
  <div
    class="w-full"
    :style="{
      backgroundImage: `linear-gradient(to bottom, rgba(241, 241, 241, 1) 0%, rgba(241, 241, 241, 0) 80%), 
                        linear-gradient(to right, rgba(241, 241, 241, 1) 0%, rgba(241, 241, 241, 0) 85%),
                        url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <div class="grid grid-cols-4 custom-display">
      <div class="col-span-4 lg:col-span-3 text-darkBlue my-8 md:my-20 lg:my-32">
        <h3 class="md:text-h2 lg:text-5xl">
          Where Innovation Meet <br />
          Affordability, Get All Your <br />
          Favourite Items Here
        </h3>
        <h5 class="md:text-h4 lg:text-h2 font-light lg:my-3">Smart Choices for Smart Living</h5>
        <button
          type="button"
          class="text-white bg-brightYellow py-1.5 lg:py-3 px-8 lg:px-14 rounded-full md:text-h4 lg:text-h3 font-normal"
        >
          <a href="#categories"> Shop Now </a>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from '@/assets/images/home-background.png'
</script>
