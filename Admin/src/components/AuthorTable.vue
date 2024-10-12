<template>
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
        <tr v-for="author in authors" :key="author._id">
          <td>{{ author._id }}</td>
          <td>{{ author.name }}</td>
          <td>{{ author.dob }}</td>
          <td>{{ author.link }}</td>
          <td>{{ author.createAt }}</td>
          <td>
            <button @click="handleOpenDetail(author)">Detail</button>
            <button @click="handleDelete(author._id)">Delete</button>
            <button @click="handleOpenEdit(author)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Teleport to="#app">
    <main-model :isOpen="isOpenDetail" :handleClose="handleClose">
      <template #authorDetail>
        <author-detail :author="selectedAuthor"></author-detail>
      </template>
    </main-model>
    <main-model :isOpen="isOpenEdit" :handleClose="handleClose">
      <template #authorEdit>
        <author-edit :author="selectedAuthor"></author-edit>
      </template>
    </main-model>
  </Teleport>
</template>

<script setup>
import MainModel from './MainModel.vue'
import AuthorDetail from './AuthorDetail.vue'
import AuthorEdit from './AuthorEdit.vue'
import { reactive, ref } from 'vue'

defineProps({
  authors: Array,
  handleDelete: Function
})

const headers = reactive(['_id', 'Name', 'Date of Birth', 'Info', 'Create At'])

const isOpenDetail = ref(false)
const isOpenEdit = ref(false)
const selectedAuthor = ref(null)
// methods

function handleOpenDetail(author) {
  isOpenDetail.value = true
  selectedAuthor.value = author
}

function handleClose() {
  isOpenDetail.value = false
  isOpenEdit.value = false
}

function handleOpenEdit(author) {
  isOpenEdit.value = true
  selectedAuthor.value = author
}
</script>

<style>
</style>