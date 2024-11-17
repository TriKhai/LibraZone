<script setup>
import TheCarousel from '@/components/carousel/TheCarousel.vue'
import ShowBook from '@/components/book/ShowBook.vue'
import GenreBook from '@/components/book/GenreBook.vue'
import { ref } from 'vue'

const label1 = ref('Classic')
const label2 = ref('Trending')

const genre1 = ref('Children')
</script>

<template>
  <main>
    <the-carousel></the-carousel>
    <show-book :label="label2"></show-book>
    <show-book :label="label1"></show-book>
    <genre-book :genre="genre1"></genre-book>
  </main>
</template>

<style>
</style>