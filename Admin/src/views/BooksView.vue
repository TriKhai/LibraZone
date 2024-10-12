<template>
  <div class="wrap__book container my-3">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Books</h4>
          </div>
          <!--end card-header-->
          <div class="card-body">
            <div class="table-responsive">
              <div
                class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"
              >
                <book-feature></book-feature>
                <book-table :bookList="bookList" :handleDeleteBook="handleDeleteBook"></book-table>

                <div class="dataTable__bottom d-flex justify-content-between">
                  <div class="dataTable-info">Showing 1 to 10 of 11 entries</div>
                  <nav class="dataTable-pagination">
                    <ul class="dataTable-pagination-list list-unstyled d-flex">
                      <li class="active"><a href="#" data-page="1">1</a></li>
                      <li class=""><a href="#" data-page="2">2</a></li>
                      <li class="pager"><a href="#" data-page="2">›</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
  </div>
</template>

<script setup>
import { useBooksStore } from '@/stores/books.store'
import { computed, getCurrentInstance } from 'vue'
import BookFeature from '../components/BookFeature.vue'
import BookTable from '@/components/BookTable.vue'

const bookStore = useBooksStore()
bookStore.getAllBookAction()
const bookList = computed(() => bookStore.books)
const { proxy } = getCurrentInstance()

function handleDeleteBook(id) {
  try {
    const res = bookStore.deleteBookAction(id)
    if (res) {
      proxy.$toast.add({
        severity: 'contrast',
        summary: 'Deleted',
        group: 'tr',
        detail: 'Delete successfully',
        life: 3000
      })
    }
  } catch (error) {
    proxy.$toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'delete failed',
      life: 3000
    })
  }
}
</script>

<style scoped>
.dataTable-pagination-list li a {
  text-decoration: none;
  color: #000444;
  border: 1px solid #eceff5;
  margin-left: 2px;
  padding: 6px 12px;
}

.dataTable__table thead tr th a {
  text-decoration: none;
  color: #000444;
}
</style>