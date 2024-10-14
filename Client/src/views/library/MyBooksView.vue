
<template>
  <div class="card">
    <Tabs value="0">
      <TabList class="mb-3 tab__list">
        <Tab value="0">Order</Tab>
        <Tab value="1">Waiting</Tab>
        <Tab value="2">Borrowing</Tab>
      </TabList>
      <div class="tab__feature">
        <input type="text" width="500px" />
      </div>
      <TabPanels class="tab__panels">
        <TabPanel value="0">
          <div>
            <div class="dropdown mb-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>

            <div class="products">
              <div
                class="product__wrap d-flex mb-2"
                v-for="(book, index) in orderBooks"
                :key="index"
              >
                <list-book :book="book" :showComfirm="true"></list-book>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div>
            <div class="dropdown mb-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>

            <div class="products">
              <div
                class="product__wrap d-flex mb-2"
                v-for="(book, index) in waitingBooks"
                :key="index"
              >
                <list-book :book="book" :showComfirm="false"></list-book>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div>
            <div class="dropdown mb-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>

            <div class="products">
              <div
                class="product__wrap d-flex mb-2"
                v-for="(book, index) in approvedBooks"
                :key="index"
              >
                <list-book :book="book" :showComfirm="false"></list-book>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import ListBook from '@/components/book/ListBook.vue'
import { useTrackStore } from '@/stores/track.store'
import { computed, onMounted } from 'vue'

const trackStore = useTrackStore()
onMounted(async () => {
  await trackStore.fetchBorrowedBooks()
})

const orderBooks = computed(() => trackStore.orderBooks)
const waitingBooks = computed(() => trackStore.waitingBooks)
const approvedBooks = computed(() => trackStore.approvedBooks)
</script>





<style>
.tab__list {
  background: red !important;
}

.tab__panels {
  border: 1px solid #000;
}
</style>
    