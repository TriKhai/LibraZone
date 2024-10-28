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
      detail: 'Bood added successfully',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'The book is already in the cart.',
      life: 3000
    })
    console.log(error)
  }
}
</script>
<template>
  <button class="btn btn-dark w-100" @click="handleBorrow">Borrow</button>
</template>


<style>
</style>