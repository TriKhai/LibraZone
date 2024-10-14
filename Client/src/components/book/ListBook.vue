<template>
  <div class="product__card d-flex mb-2">
    <div class="produt__img">
      <img :src="book.image" alt="" />
    </div>
    <div class="product__content">
      {{ book.image }}
    </div>
    <div class="product__feature">
      <borrow-feature :trackId="book._id" v-show="showComfirm"></borrow-feature>
    </div>
  </div>
</template>

<script setup>
import BorrowFeature from './BorrowFeature.vue'
defineProps({
  book: {
    type: Object
  },
  showComfirm: {
    type: Boolean
  }
})
</script>

<style>
</style>