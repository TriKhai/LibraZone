<template>
  <div class="col-3">
    <div class="wrapp__image">
      <div class="img__book d-flex justify-content-center mb-2">
        <img alt="" :src="imageBook" class="img-thumbnail" />
      </div>
      <div class="btn__borrow">
        <borrow-button :bookId="bookId"></borrow-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BorrowButton from './BorrowButton.vue'

defineProps({
  imageBook: {
    type: String
  },
  bookId: {
    type: String
  }
})
</script>

<style scoped>
.wrapp__image {
  width: 100%;
}

.wrapp__image img {
  width: 100%;
}
</style>