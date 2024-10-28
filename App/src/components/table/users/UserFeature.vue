<template>
  <div class="dataTable__top d-flex justify-content-between">
    <div class="dataTable__dropdown">
      <label
        ><select class="dataTable__selector" fdprocessedid="oglu9">
          <option value="5">5</option>
          <option value="10" selected="">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">50</option>
        </select>
        entries per page</label
      >
    </div>
    <div class="dataTable__feature">
      <button class="me-2" @click="handleOpenAdd()">Add</button>
      <input class="dataTable-input" placeholder="Search..." type="text" fdprocessedid="k0gxpd" />
    </div>
    <Teleport to="#app">
      <main-model :isOpen="isOpenModel" :handleClose="handleClose">
        <template #userAdd>
          <user-add></user-add>
        </template>
      </main-model>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainModel from '@/components/modal/MainModel.vue'
import UserAdd from './UserAdd.vue'

// model
const isOpenModel = ref(false)
function handleOpenAdd() {
  isOpenModel.value = true
}
function handleClose() {
  isOpenModel.value = false
}
</script>

<style>
</style>