<script setup>
import router from '@/router/index'
function handleBorrow() {
  router.push({ name: 'home' })
}

defineProps({
  idBook: Object
})
</script>
<template>
  <button class="btn btn-dark w-100 mt-3" @click="handleBorrow">Borrow</button>
</template>


<style>
</style>