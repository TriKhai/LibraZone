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
        <tr v-for="user in users" :key="user._id">
          <td>{{ user._id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.email }}</td>
          <!-- <td>{{ user.password }}</td> -->
          <td>{{ user.address }}</td>
          <td>{{ user.type }}</td>
          <td>
            <button @click="handleOpenDetail(user)">Detail</button>
            <button @click="handleDelete(user._id)">Delete</button>
            <button @click="handleOpenEdit(user)">Edit</button>
          </td>
          <Teleport to="#app">
            <main-model :isOpen="isOpenDetail" :handleClose="handleClose">
              <template #userDetail>
                <user-detail :user="selectedUser"></user-detail>
              </template>
            </main-model>
            <!-- <main-model :isOpen="isOpenEdit" :handleClose="handleClose">
              <template #editBook>
                <edit-book :book="book"></edit-book>
              </template>
            </main-model> -->
          </Teleport>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import MainModel from '@/components/modal/MainModel.vue'
// import EditBook
import UserDetail from './UserDetail.vue'
import { reactive, ref } from 'vue'

defineProps({
  users: Array,
  handleDelete: Function
})

const headers = reactive(['_id', 'First Name', 'Last Name', 'Gender', 'Email', 'Address', 'Type'])
const isOpenDetail = ref(false)
const isOpenEdit = ref(false)
const selectedUser = ref(null)
// methods

function handleOpenDetail(author) {
  isOpenDetail.value = true
  selectedUser.value = author
}

function handleClose() {
  isOpenDetail.value = false
  isOpenEdit.value = false
}

function handleOpenEdit(author) {
  isOpenEdit.value = true
  selectedUser.value = author
}
</script>

<style>
</style>