<template>
  <div class="wrap" v-if="author">
    <div class="info__author">
      <div>
        <h4>{{ author.name }}</h4>
      </div>
      <div>
        <p>Date of birth: {{ author.dob }}</p>
      </div>
      <div>
        <p>{{ author.bio }}</p>
      </div>
      <div>
        <a :href="author.link">Infomation in website</a>
      </div>
    </div>
    <div class="image__author">
      <img :src="imageBook" :alt="author.name" />
    </div>
  </div>
  <div v-else>updating...</div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  author: Object
})
const { author } = toRefs(props)

const imageBook = computed(() => {
  return `http://localhost:3000/${author.value.image}`
})
</script>

<style>
</style>