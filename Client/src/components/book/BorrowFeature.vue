<template>
  <div>
    <button class="btn btn-primary" @click="handleConfirm">Confirm</button>
  </div>
</template>

<script setup>
import { useTrackStore } from '@/stores/track.store'
import { toRefs } from 'vue'

const props = defineProps({
  trackId: String
})
const trackStore = useTrackStore()
const { trackId } = toRefs(props)
const handleConfirm = async () => {
  await trackStore.confirmBorrowBook(trackId.value)
  // console.log(trackId.value)
}
</script>

<style>
</style>