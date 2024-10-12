<template>
  <div class="container">
    <div class="product-cards">
      <div
        v-for="product in paginatedProducts"
        :key="product.code"
        class="m-2 p-4 d-flex item-hover product-card"
      >
        <div class="mb-4 me-2 mx-auto">
          <div class="relative mx-auto">
            <img :src="product.images" class="w-full rounded" />
          </div>
          <h3>{{ product.name }}</h3>
          <button class="btn btn-dark w-100 my-3">Borrow</button>
        </div>
      </div>
    </div>

    <Paginator
      :first="first"
      :rows="rows"
      :totalRecords="totalRecords"
      :rowsPerPageOptions="[10, 20, 30]"
      @page="onPageChange"
      class="my-4"
    />
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue'
import Paginator from 'primevue/paginator'

const props = defineProps({
  bookList: {
    type: Array
  }
})

const { bookList } = toRefs(props)
const products = bookList.value
console.log(products)
// const products = reactive([
//   { code: 'P001', name: 'Product 1', category: 'Category A', quantity: 10 },
//   { code: 'P002', name: 'Product 2', category: 'Category B', quantity: 20 },
//   { code: 'P003', name: 'Product 3', category: 'Category C', quantity: 30 },
//   { code: 'P004', name: 'Product 4', category: 'Category D', quantity: 40 },
//   { code: 'P005', name: 'Product 5', category: 'Category E', quantity: 50 },
//   { code: 'P006', name: 'Product 6', category: 'Category F', quantity: 60 },
//   { code: 'P007', name: 'Product 7', category: 'Category G', quantity: 70 },
//   { code: 'P008', name: 'Product 8', category: 'Category H', quantity: 80 },
//   { code: 'P009', name: 'Product 9', category: 'Category A', quantity: 10 },
//   { code: 'P0010', name: 'Product 10', category: 'Category B', quantity: 20 },
//   { code: 'P0011', name: 'Product 11', category: 'Category C', quantity: 30 },
//   { code: 'P0012', name: 'Product 12', category: 'Category D', quantity: 40 },
//   { code: 'P0013', name: 'Product 13', category: 'Category E', quantity: 50 },
//   { code: 'P0014', name: 'Product 14', category: 'Category F', quantity: 60 },
//   { code: 'P0015', name: 'Product 15', category: 'Category G', quantity: 70 },
//   { code: 'P0016', name: 'Product 16', category: 'Category H', quantity: 80 },
//   { code: 'P0017', name: 'Product 17', category: 'Category A', quantity: 10 },
//   { code: 'P0018', name: 'Product 18', category: 'Category B', quantity: 20 },
//   { code: 'P0019', name: 'Product 19', category: 'Category C', quantity: 30 },
//   { code: 'P0020', name: 'Product 20', category: 'Category D', quantity: 40 },
//   { code: 'P0021', name: 'Product 21', category: 'Category A', quantity: 10 },
//   { code: 'P0022', name: 'Product 22', category: 'Category B', quantity: 20 },
//   { code: 'P0023', name: 'Product 23', category: 'Category C', quantity: 30 },
//   { code: 'P0024', name: 'Product 24', category: 'Category D', quantity: 40 },
//   { code: 'P0025', name: 'Product 25', category: 'Category E', quantity: 50 },
//   { code: 'P0026', name: 'Product 26', category: 'Category F', quantity: 60 },
//   { code: 'P0027', name: 'Product 27', category: 'Category G', quantity: 70 },
//   { code: 'P0028', name: 'Product 28', category: 'Category H', quantity: 80 },
//   { code: 'P0029', name: 'Product 29', category: 'Category A', quantity: 10 },
//   { code: 'P0030', name: 'Product 30', category: 'Category B', quantity: 20 },
//   { code: 'P0031', name: 'Product 31', category: 'Category C', quantity: 30 },
//   { code: 'P0032', name: 'Product 32', category: 'Category D', quantity: 40 },
//   { code: 'P0033', name: 'Product 33', category: 'Category E', quantity: 50 },
//   { code: 'P0034', name: 'Product 34', category: 'Category F', quantity: 60 },
//   { code: 'P0035', name: 'Product 35', category: 'Category G', quantity: 70 },
//   { code: 'P0036', name: 'Product 36', category: 'Category H', quantity: 80 },
//   { code: 'P0037', name: 'Product 37', category: 'Category A', quantity: 10 },
//   { code: 'P0038', name: 'Product 38', category: 'Category B', quantity: 20 },
//   { code: 'P0039', name: 'Product 39', category: 'Category C', quantity: 30 },
//   { code: 'P0040', name: 'Product 40', category: 'Category D', quantity: 40 }
// ])
// let product = reactive([])
const first = ref(0) // Chỉ mục phần tử đầu tiên của trang hiện tại
const rows = ref(10) // Số sản phẩm trên mỗi trang

// Tính tổng số sản phẩm
const totalRecords = computed(() => products.length)

// Lấy danh sách sản phẩm hiện tại theo trang
const paginatedProducts = computed(() => {
  const start = first.value
  const end = start + rows.value // Không cần Math.min vì Paginator đã giới hạn trang
  // console.log(products.slice(start, end))
  return products.slice(start, end)
})

// Hàm xử lý sự kiện chuyển trang
const onPageChange = (event) => {
  first.value = event.first // Cập nhật chỉ mục phần tử đầu tiên
  rows.value = event.rows // Cập nhật số sản phẩm mỗi trang
  console.log(rows.value)
}
</script>

<style scoped>
.product-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Đảm bảo các thẻ đều khoảng cách */
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.item-hover {
  transition: transform 0.2s;
}

.item-hover:hover {
  /* transform: scale(1.05); */
  border-color: #000;
}
</style>
