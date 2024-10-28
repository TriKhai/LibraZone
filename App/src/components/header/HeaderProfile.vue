<template>
  <ul class="navbar-nav me-auto">
    <li class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2">
      <a class="nav-link active" aria-current="page" href="#"
        ><i class="fa fa-sign-out-alt" @click="handleSignOut"></i
      ></a>
    </li>
    <li class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2">
      <a class="nav-link" href="#" @click="handleSignOut">
        <img src="../image.png" class="img-fluid rounded" alt="" />
      </a>
    </li>
    <li class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2">
      <a class="nav-link" href="#" @click="handleOpenModal()"><i class="pi pi-bars"></i></a>
    </li>
  </ul>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const { proxy } = getCurrentInstance()
const router = useRouter()
const isOpenModel = ref(false)

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

function handleOpenModal() {
  isOpenModel.value = true
}

// function handleCloseModal() {
//   isOpenModel.value = false
// }
</script>

<style>
</style>