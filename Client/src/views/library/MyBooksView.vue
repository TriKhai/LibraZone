<!-- <template>
  <div>
    <h1>Danh sách sách</h1>
    <ul>
      <li v-for="book in booksStore.bookList" :key="book.id">
        {{ book }}
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useBooksStore } from '../../stores/books.store' // Đường dẫn đến store

export default {
  setup() {
    const booksStore = useBooksStore() // Sử dụng store

    // Gọi action để lấy danh sách sách khi component được mount
    onMounted(async () => {
      try {
        await booksStore.getAllBookAction()
      } catch (error) {
        console.error('Lỗi khi lấy sách:', error.message)
      }
    })
    return {
      booksStore // Trả về store để có thể sử dụng trong template
    }
  }
}
</script> -->
