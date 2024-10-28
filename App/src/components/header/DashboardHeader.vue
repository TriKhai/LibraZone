<template>
  <nav
    class="py-3 navbar-wrap navbar navbar-expand navbar-light bg-light wrap__header"
    aria-label="Second navbar example"
  >
    <div class="container-fluid">
      <div class="collapse navbar-collapse justify-content-end" id="navbarsExample02">
        <div class="navbar-right">
          <ul class="navbar-nav me-auto">
            <li
              class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2"
            >
              <a class="nav-link active" aria-current="page" href="#"
                ><i class="fa fa-sign-out-alt" @click="handleSignOut"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const authStore = useAuthStore()
const router = useRouter()

function handleSignOut() {
  authStore.logOutAction()
  proxy.$toast.add({
    severity: 'contrast',
    group: 'br',
    summary: 'Success',
    detail: 'Log out successfully',
    life: 3000
  })
  router.push('/login')
}
</script>

<style scoped>
.btn-header-bar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ebedf2;
  color: #000;
}
.wrap__header {
  border-bottom: 1px solid #ccc;
}
</style>