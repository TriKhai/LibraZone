<template>
  <div class="wrap__record container-fluid mt-3">
    <div class="row">
      <div class="col-12">
        <div class="card wrap__card">
          <div class="card-header">
            <h4 class="card-title">Record</h4>
          </div>
          <div class="card-body py-2">
            <div class="table-responsive">
              <div
                class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns d-flex"
              >
                <div class="record__detail d-flex" v-if="record">
                  <div class="floating-box my-2 py-1 px-2 mx-1">
                    <span class="floating-label">Record</span>
                    <div class="record__col">
                      <div><strong>ID:</strong> {{ record._id }}</div>
                      <div class="me-3 col"><strong>State:</strong> {{ record.state }}</div>
                      <div class="">
                        <strong>Approved date:</strong> {{ formatDate(record.dateApproved) }}
                      </div>
                      <div class=""><strong>Due:</strong> {{ formatDate(record.dueDate) }}</div>
                    </div>
                  </div>

                  <div class="floating-box my-2 py-1 px-2 mx-1">
                    <span class="floating-label">Reader</span>
                    <div class="reader__detail">
                      <div><strong>ID:</strong> {{ record.reader._id }}</div>
                      <div><strong>Name:</strong> {{ record.reader.lastName }}</div>
                      <div><strong>Address:</strong> {{ record.reader.address }}</div>
                      <div><strong>Email:</strong> {{ record.reader.email }}</div>
                    </div>
                  </div>
                  <div class="floating-box my-2 py-1 px-2 mx-1">
                    <span class="floating-label">Book</span>
                    <div class="book__detail">
                      <div><strong>ID:</strong> {{ record.book._id }}</div>
                      <div><strong>Name:</strong> {{ record.book.title }}</div>
                      <div v-if="record.book.author.name">
                        <strong>Author:</strong> {{ record.book.author.name }}
                      </div>
                      <div v-else><strong>Author:</strong> updating...</div>
                      <div class="d-flex">
                        <div class="me-1"><strong>Stock:</strong> {{ record.book.stock }}</div>
                        <div><strong>Price:</strong> {{ record.book.price }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="ms-3">
                    <div class="mb-2">
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
                    <div v-if="record.state === 'Waiting'">
                      <button @click="handleCancelRecord(record._id)">Cancel</button>
                    </div>
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
  alert(`Confirm return ${recordID}`)
}

const handleCancelRecord = async (recordID) => {
  await recordStore.cancelRecord(recordID)
  alert(`Cancel ${recordID}`)
}

function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  return new Date(date).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.wrap__record,
.wrap__card {
  height: 25vh;
}

/* legend css */
.floating-box {
  position: relative;
  border: 1px solid #ccc;
}

.floating-label {
  position: absolute;
  top: -10px; /* Điều chỉnh vị trí */
  left: 15px; /* Điều chỉnh vị trí */
  background: white; /* Nền trắng để che đi phần khung viền */
  padding: 0 5px;
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
}

p {
  margin: 0;
}

button {
  width: 8rem;
  padding: 0.2rem;
}

@media (max-width: 1400px) {
  .wrap__record,
  .wrap__card {
    height: 27vh;
  }
}

@media (max-width: 1200px) {
  .wrap__record,
  .wrap__card {
    height: 33vh;
  }
}

@media (max-width: 1048px) {
  .wrap__record {
    margin-bottom: 30px;
  }
}
</style>