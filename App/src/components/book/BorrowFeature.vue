<template>
  <div class="">
    <button class="w-100" @click="handleConfirm">Confirm</button>
  </div>
</template>

<script setup>
import { useTrackStore } from '@/stores/track.store'
import { useToast } from 'primevue/usetoast'
import { toRefs } from 'vue'

const toast = useToast()
const props = defineProps({
  trackId: String,
  quantity: Number
})
const trackStore = useTrackStore()
const { trackId, quantity } = toRefs(props)
const handleConfirm = async () => {
  try {
    await trackStore.confirmBorrowBook(trackId.value, quantity.value)
    toast.add({
      severity: 'contrast',
      summary: 'Success',
      group: 'tr',
      detail: 'The book is awaiting approval.',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'Exceeded quantity',
      life: 3000
    })
  }
  // console.log(trackId.value)
}
</script>

<style>
</style>