
<template>
  <div class="row" v-if="orderBooks || waitingBooks || approvedBooks">
    <div class="col-8 p-0">
      <Tabs value="0">
        <TabList class="mb-3 tab__list">
          <Tab value="0">Order</Tab>
          <Tab value="1">Waiting</Tab>
          <Tab value="2">Borrowing</Tab>
        </TabList>

        <TabPanels class="tab__panels">
          <TabPanel value="0">
            <div class="wrap__mybook">
              <div class="products">
                <div
                  class="product__wrap d-flex mb-2"
                  v-for="(book, index) in orderBooks"
                  :key="index"
                >
                  <list-book :book="book"></list-book>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div>
              <div class="products">
                <div
                  class="product__wrap d-flex mb-2"
                  v-for="(book, index) in waitingBooks"
                  :key="index"
                >
                  <list-book :book="book"></list-book>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div>
              <div class="products">
                <div
                  class="product__wrap d-flex mb-2"
                  v-for="(book, index) in approvedBooks"
                  :key="index"
                >
                  <list-book :book="book"></list-book>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <div class="col-4">
      <div>
        <card-feature></card-feature>
      </div>
    </div>
  </div>
  <div v-else>Add book to render</div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import ListBook from '@/components/book/ListBook.vue'
import CardFeature from '@/components/book/CardFeature.vue'
import { useTrackStore } from '@/stores/track.store'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const trackStore = useTrackStore()
const router = useRouter()
onMounted(async () => {
  const books = await trackStore.fetchBorrowedBooks()
  if (!books) {
    alert('Thêm sách dô dùm cái')
    router.push({ name: 'books' })
  }
})

const orderBooks = computed(() => trackStore.orderBooks)
const waitingBooks = computed(() => trackStore.waitingBooks)
const approvedBooks = computed(() => trackStore.approvedBooks)

// const activeCardBook = ref(null)

// Method to set the active card
// const handleSetActiveCard = (recordID) => {
//   activeCardBook.value = recordID
//   console.log(activeCardBook.value)
// }
</script>

<style scoped>
.tab__list {
  background: red !important;
}

.tab__panels {
  border: 1px solid #ccc;
}

.products {
  height: 60vh;
  overflow-y: scroll;
}

.card__detail div {
  background: #fff;
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
}

/* active */
.activeCard .product__card {
  background-color: #e9e9e9;
}
</style>
    