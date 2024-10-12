<template>
  <div class="container wrap__form my-5">
    <h3 class="text-center">Sign Up</h3>
    <form class="register" @submit.prevent="handleSubmit">
      <div class="name__form">
        <div class="firstName__form mb-2">
          <label for="firstName" class="form-label fw-bold">First Name</label>
          <input type="text" class="form-control" id="firstName" v-model="user.firstName" />
        </div>
        <div class="lastName__form mb-2">
          <label for="lastName" class="form-label fw-bold">Last Name</label>
          <input type="text" class="form-control" id="lastName" v-model="user.lastName" />
        </div>
      </div>
      <div class="gender__form mb-2">
        <label for="" class="form-label me-3 fw-bold">Gender: </label>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="Male"
            checked
            v-model="user.gender"
          />
          <label class="form-check-label" for="inlineRadio1">Male</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="Female"
            v-model="user.gender"
          />
          <label class="form-check-label" for="inlineRadio2">Female</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="Other"
            v-model="user.gender"
          />
          <label class="form-check-label" for="inlineRadio2">Other</label>
        </div>
      </div>

      <div class="form-group mb-2">
        <label for="dateInput " class="fw-bold form-label">Day of birth:</label>
        <input type="date" id="dateInput" class="form-control" v-model="user.dateOfBirth" />
      </div>

      <div class="form-group mb-2">
        <label for="addressInput " class="fw-bold form-label">Address:</label>
        <input type="text" id="addressInput" class="form-control" v-model="user.address" />
      </div>

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
        <!-- <div id="passwordHelpBlock" class="form-text">
          Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji.
        </div> -->
      </div>
      <div>
        <label for="rePwrd" class="form-label fw-bold">Repeat Password</label>
        <input
          type="password"
          id=""
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="user.rePassword"
        />
      </div>
      <div class="wrap__submit__btn mt-4 text-center">
        <button class="submit__btn text-light" type="submit">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter() // Sử dụng router
    const storeAuth = useAuthStore()
    const user = reactive({
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      rePassword: '',
      address: '',
      dateOfBirth: '',
      gender: 'Male'
    })
    const { proxy } = getCurrentInstance()
    const handleSubmit = async () => {
      try {
        if (user.password === user.rePassword) {
          // console.log('Hello')
          const reqUser = {
            lastName: user.firstName,
            firstName: user.lastName,
            email: user.email,
            password: user.password,
            address: user.address,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender
          }
          // await storeAuth.signUpActions(reqUser)
          const result = await storeAuth.signUpActions(reqUser)
          console.log('Đăng ký thành công:', result)
          console.log('Đăng ký thành công:')
          // Sử dụng `getCurrentInstance` để lấy `proxy`

          proxy.$toast.add({
            severity: 'contrast',
            summary: 'Success',
            group: 'tr',
            detail: 'Registered successfully',
            life: 3000
          })

          router.push('/login')
        } else {
          proxy.$toast.add({
            severity: 'error',
            summary: 'Error',
            group: 'tr',
            detail: 'Password does not match',
            life: 3000
          })
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    return {
      user,
      handleSubmit
    }
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