<template>
  <div class="navbar-right">
    <ul class="navbar-nav me-auto" v-if="isLogin">
      <li class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2">
        <a class="nav-link active" aria-current="page" href="#"><i class="fa fa-cog"></i></a>
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

    <ul class="navbar-nav me-auto" v-else>
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link class="nav-link" :to="{ name: 'login' }"
          ><i class="fa fa-sign-in-alt"></i> Log In</router-link
        >
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link class="nav-link" :to="{ name: 'signup' }"
          ><i class="fa fa-user"></i> Sign Up</router-link
        >
      </li>
    </ul>

    <Teleport to="#app">
      <right-modal :isOpen="isOpenModel" :handleCloseModal="handleCloseModal"></right-modal>
    </Teleport>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const { proxy } = getCurrentInstance()
const router = useRouter()
const isLogin = computed(() => {
  return authStore.isAuthenticated
})
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

function handleCloseModal() {
  isOpenModel.value = false
}
</script>

<style>
</style>