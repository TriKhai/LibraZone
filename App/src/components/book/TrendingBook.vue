<template>
  <div class="wrap__books">
    <hr />
    <div class="title-carousel">
      <h5 class="ms-5">Trending Books</h5>
    </div>
    <Carousel
      :value="trendBooks"
      :numVisible="5"
      :numScroll="5"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <book-card :book="slotProps.data"></book-card>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Carousel from 'primevue/carousel'
import { useBookStore } from '@/stores/book.store'
// import BorrowBook from './BorrowBook.vue'
import BookCard from './BookCard.vue'

const bookStore = useBookStore()

onMounted(async () => {
  await bookStore.fetchBookAction()
})

const trendBooks = computed(() => bookStore.trendBooks)

const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
])
</script>

<style>
/* Thêm các style nếu cần */
</style>
