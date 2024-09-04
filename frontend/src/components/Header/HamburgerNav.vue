<template>
  <div @click="handleClick" :class="{ toggle: true, active: isOpen }">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </div>
</template>
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:isOpen'])

function handleClick() {
  emit('update:isOpen', !props.isOpen)
}
</script>
<style scoped>
.toggle {
  @apply md:hidden relative w-10 h-10 flex justify-center items-center overflow-hidden;
}

.bar {
  @apply absolute w-8 h-0.5 bg-white rounded transition-transform ease-in duration-200;
}

.toggle span:nth-child(1) {
  transform: translateY(-10px);
}

.toggle.active span:nth-child(1) {
  transform: translateY(0px) rotate(45deg);
}

.toggle span:nth-child(2) {
  transform: translateY(10px);
}

.toggle.active span:nth-child(2) {
  transform: translateY(0px) rotate(315deg);
}

.toggle span:nth-child(3) {
  transform: translateY(0px) rotate(0deg);
}

.toggle.active span:nth-child(3) {
  transform: translateX(50px);
}
</style>
