<template>
  <div class="container wrap__form my-5">
    <!-- <div class="container wrap__form my-5 col-md-6 col-lg-4"> -->
    <h3 class="text-center">Log In</h3>
    <form @submit.prevent="handleLogin">
      <div class="">
        <label for="emailAddress" class="form-label fw-bold">Email Address</label>
        <input type="email" class="form-control" id="emailAddress" v-model="user.email" />
      </div>
      <div>
        <label for="pwrd" class="form-label fw-bold">Password</label>
        <input
          type="password"
          id="pwrd"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="user.password"
        />
      </div>
      <div class="wrap__submit__btn mt-4 text-center">
        <button class="submit__btn text-light" type="submit">Log In</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
const storeAuth = useAuthStore()
const { proxy } = getCurrentInstance()
const router = useRouter()

const user = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await storeAuth.logInAction(user)
    proxy.$toast.add({
      severity: 'contrast',
      group: 'br',
      summary: 'Success',
      detail: 'Log in successfully',
      life: 3000
    })
    router.push('/')
  } catch (error) {
    console.log(error.message)
    proxy.$toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'Account or password is incorrect',
      life: 3000
    })
  }
}
</script>

<style scoped>
.wrap__form {
  width: 33%;
  padding: 30px;
  border: 1px solid #000;
  border-radius: 4px;
}

.form-control {
  transition: all 0.75s;
}
.form-control:hover {
  border-color: #000;
}

.submit__btn {
  width: 100%;
  height: 2.5rem;
  background-color: #0376b8;
  color: #fff;
  border-radius: 8px;
  border: none;
}

.submit__btn:hover {
  background: #013654;
  /* border: #000; */
}
</style>