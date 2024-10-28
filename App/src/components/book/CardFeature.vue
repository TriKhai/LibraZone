<template>
  <div class="container">
    <div class="search__book row mx-2 my-3">
      <input type="text" class="col-9" />
      <button class="col-3">Search</button>
    </div>
    <div class="sort__book row ms-2 me-3 my-3">
      <div class="floating-box my-2 py-1 px-2 mx-1">
        <span class="floating-label">Sort</span>
        <div class="sort__type my-3 container">
          <div class="row mb-2">
            <div class="col-6"><button class="w-100">sort date</button></div>
            <div class="col-6"><button class="w-100">sort date</button></div>
          </div>
          <div class="row mb-2">
            <div class="col-6"><button class="w-100">sort date</button></div>
            <div class="col-6"><button class="w-100">sort date</button></div>
          </div>
        </div>
      </div>
    </div>
    <div class="book__show mt-4" v-if="record">
      <div class="img__book d-flex">
        <img :src="imgBook" alt="" />
        <div class="ms-1">
          <div class="content__book">
            <div class="title__book">
              <p class="fs-3 fw-bold mb-0">{{ record.book.title }}</p>
              <span>({{ record.book.published_date }})</span>
            </div>
            <div class="fst-italic">
              <p v-if="record.author" class="mb-0">{{ record.author.name }}</p>
              <p v-else class="mb-0">Updating author...</p>
            </div>
            <div class="stock__book">
              <p><strong>Stock:</strong> {{ record.book.stock }}</p>
            </div>
            <div class="quantity__book" v-if="record.state === 'Order'">
              <p :class="record.book.stock < quantity ? 'text-danger' : ''">
                <strong>Quantity:</strong> {{ quantity }}
              </p>
            </div>
            <div class="quantity__book" v-else>
              <p><strong>Quantity:</strong> {{ record.quantity }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="product__feature mt-3 w-100 mx-2 d-flex" v-if="record.state === 'Order'">
        <div class="px-0"><input type="number" placeholder="Quantity..." v-model="quantity" /></div>
        <div class="px-0 confirm__book">
          <borrow-feature :trackId="record._id" :quantity="quantity"></borrow-feature>
        </div>
      </div>
      <div class="product__feature mt-3 w-100 mx-2 d-flex" v-else>
        <strong class="me-2">State:</strong> {{ record.state }}
      </div>
    </div>
  </div>
</template>

<script setup>
import BorrowFeature from './BorrowFeature.vue'
import { useTrackStore } from '@/stores/track.store'
import { computed, ref } from 'vue'

const trackStore = useTrackStore()
const record = computed(() => trackStore.record)
const imgBook = computed(() => {
  return 'http://localhost:3000/' + record.value.book.image
})

const quantity = ref(1)
</script>

<style scoped>
.book__show .img__book img {
  width: 12vw;
}

.sort__book {
  height: 20vh;
}

.confirm__book {
  width: 180px;
}

/* legend */

/*  */
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
</style>