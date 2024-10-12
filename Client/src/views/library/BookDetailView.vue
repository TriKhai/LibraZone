<script setup>
import EditionCover from '@/components/book/EditionCover.vue'
import EditionAbout from '@/components/book/EditionAbout.vue'
import { useBookStore } from '@/stores/book.store'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const route = useRouter()
const bookStore = useBookStore()

const bookDetail = computed(() => bookStore.book)

onMounted(async () => {
  const isBook = route.currentRoute._value.params.id
  if (isBook) {
    await bookStore.getBookAction(isBook)
  }
})
</script>

<template>
  <div class="container">
    <div class="wrap__book__detail row justify-content-center">
      <edition-cover :bookDetail="bookDetail"></edition-cover>
      <edition-about></edition-about>
      <div class="edition__about d-flex"></div>
    </div>
  </div>
</template>

<style>
</style>