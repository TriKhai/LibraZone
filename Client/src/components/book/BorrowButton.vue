<script setup>
import { useTrackStore } from '@/stores/track.store'
import { toRefs } from 'vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const props = defineProps({
  bookId: {
    type: Object
  }
})

const trackStore = useTrackStore()
const { bookId } = toRefs(props)
const handleBorrow = async () => {
  try {
    await trackStore.createBorrowAction(bookId.value)
    toast.add({
      severity: 'contrast',
      summary: 'Success',
      group: 'tr',
      detail: 'Registered successfully',
      life: 3000
    })
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <button class="btn btn-dark w-100 mt-3" @click="handleBorrow">Borrow</button>
</template>


<style>
</style>