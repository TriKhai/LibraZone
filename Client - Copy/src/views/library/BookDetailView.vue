<template>
  <div class="container">
    <div class="wrap__book__detail row justify-content-center">
      <edition-cover :bookDetail="bookDetail"></edition-cover>
      <edition-about></edition-about>
      <div class="edition__about d-flex"></div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'pinia'
import { useBooksStore } from '../../stores/books.store'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EditionCover from '../../components/book/EditionCover.vue'
import EditionAbout from '../../components/book/EditionAbout.vue'
export default {
  components: { EditionCover, EditionAbout },
  setup() {
    const route = useRoute()
    const bookStore = useBooksStore()
    const bookDetail = computed(() => bookStore.bookDetail)

    // Gọi phương thức getBookDetail khi component được mount
    const getBookDetail = () => {
      const bookId = route.params.id // Lấy ID từ route params
      bookStore.getBookDetailAction(bookId) // Gọi phương thức trong store
    }

    // Sử dụng onMounted để gọi phương thức khi component được mount
    onMounted(getBookDetail)

    return { bookDetail }
  }
}
</script>

<style>
</style>