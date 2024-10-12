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
        <tr v-for="pub in publisher" :key="pub._id">
          <td>{{ pub._id }}</td>
          <td>{{ pub.name }}</td>
          <td>{{ pub.location }}</td>
          <td>{{ pub.establishedYear }}</td>
          <td>{{ pub.createAt }}</td>
          <td>{{ pub.updateAt }}</td>
          <td>
            <button @click="handleOpenDetail(pub)">Detail</button>
            <button @click="handleDelete(pub._id)">Delete</button>
            <button @click="handleOpenEdit(pub)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Teleport to="#app">
    <main-modal :isOpen="isOpenDetail" :handleClose="handleClose">
      <template #publisherDetail>
        <publish-detail :publisher="selectedPublisher"></publish-detail>
      </template>
    </main-modal>
    <main-modal :isOpen="isOpenEdit" :handleClose="handleClose">
      <template #publisherEdit>
        <publisher-edit :publisher="selectedPublisher"></publisher-edit>
      </template>
    </main-modal>
  </Teleport>
</template>

<script setup>
import PublishDetail from './PublisherDetail.vue'
import PublisherEdit from './PublisherEdit.vue'
import { reactive, ref } from 'vue'

defineProps({
  publisher: Array,
  handleDelete: Function
})
const headers = reactive(['_Id', 'Name', 'Location', 'Established Year', 'Create At', 'Update At'])

const isOpenDetail = ref(false)
const isOpenEdit = ref(false)
const selectedPublisher = ref(null)

function handleOpenDetail(publisher) {
  isOpenDetail.value = true
  selectedPublisher.value = publisher
}

function handleClose() {
  isOpenDetail.value = false
  isOpenEdit.value = false
}

function handleOpenEdit(publisher) {
  isOpenEdit.value = true
  selectedPublisher.value = publisher
}
</script>

<style>
</style>