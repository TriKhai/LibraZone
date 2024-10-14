<template>
  <div class="wrap__record container mt-3">
    <div class="row">
      <div class="col-12">
        <div class="card wrap__card">
          <div class="card-header">
            <h4 class="card-title">Record</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <div
                class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"
              >
                <div class="record__detail d-flex" v-if="record">
                  <div class="record__col">
                    <div>Record</div>

                    <div>ID: {{ record._id }}</div>
                    <div class="d-flex">
                      <div class="me-3">State: {{ record.state }}</div>
                      <button @click="handleApprove(record._id)" v-if="record.state === 'Waiting'">
                        Approve
                      </button>
                      <button
                        @click="handleConfirmReturn(record._id)"
                        v-else-if="record.state === 'Approved'"
                      >
                        Confirm Return
                      </button>
                    </div>
                    <div class="">
                      <div class="me-3">borrow date: {{ record.dateBorrowed }}</div>
                    </div>
                  </div>
                  <div class="reader__detail ms-3">
                    <div>Reader</div>
                    <div>ID: {{ record.reader._id }}</div>
                    <div>Name: {{ record.reader.lastName }}</div>
                    <div>Address: {{ record.reader.address }}</div>
                    <div>Email: {{ record.reader.email }}</div>
                  </div>
                  <div class="book__detail ms-3">
                    <div>Book</div>
                    <div>ID: {{ record.book._id }}</div>
                    <div>Name: {{ record.book.title }}</div>
                    <div>Author: {{ record.book.label }}</div>
                    <div>Price: {{ record.book.price }}</div>
                  </div>
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
import { useRecordStore } from '@/stores/record.store'
import { computed } from 'vue'

const recordStore = useRecordStore()
const record = computed(() => recordStore.getRecord)

const handleApprove = async (recordID) => {
  await recordStore.approve(recordID)
}

const handleConfirmReturn = async (recordID) => {
  await recordStore.confirmReturn(recordID)
  alert(`Deleted ${recordID}`)
}
</script>

<style scoped>
.wrap__record,
.wrap__card {
  height: 25vh;
}
</style>