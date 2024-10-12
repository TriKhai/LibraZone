<template>
  <div>
    <div class="dataTable__container">
      <table class="table dataTable__table" id="datatable_1">
        <thead class="thead-light">
          <tr>
            <th data-sortable="" v-for="header in headers" :key="header">
              <a href="#" class="dataTable-sorter">{{ header }}</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in bookList" :key="book._id">
            <td>{{ book._id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author ? book.author.name : '' }}</td>
            <td>{{ book.publisher ? book.publisher.name : '' }}</td>
            <td>{{ book.price }}</td>
            <td>{{ book.stock }}</td>
            <td>{{ book.country }}</td>
            <td>{{ book.language }}</td>
            <td>
              <button @click="handleOpenDetail(book)">Detail</button>
              <button @click="handleDeleteBook(book._id)">Delete</button>
              <button @click="handleOpenEdit(book)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Teleport to="#app">
      <main-modal :isOpen="isOpenDetail" :handleClose="handleClose">
        <template #bookDetail>
          <book-detail :book="selectedBook"></book-detail>
        </template>
      </main-modal>
      <main-modal :isOpen="isOpenEdit" :handleClose="handleClose">
        <template #bookEdit>
          <book-edit :book="selectedBook"></book-edit>
        </template>
      </main-modal>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BookDetail from './BookDetail.vue'
import BookEdit from './BookEdit.vue'
const headers = reactive([
  '_id',
  'Title',
  'Author',
  'Publisher',
  'Price',
  'Stock',
  'Country',
  'Language'
])

defineProps({
  bookList: Array,
  handleDeleteBook: Function
})

const isOpenDetail = ref(false)
const isOpenEdit = ref(false)
const selectedBook = ref(null)
// methods

function handleOpenDetail(book) {
  isOpenDetail.value = true
  selectedBook.value = book
}

function handleClose() {
  isOpenDetail.value = false
  isOpenEdit.value = false
}

function handleOpenEdit(book) {
  isOpenEdit.value = true
  selectedBook.value = book
}
</script>

<style>
</style>