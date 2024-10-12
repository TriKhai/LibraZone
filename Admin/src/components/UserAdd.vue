<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Add Publisher</h3>
      <hr />
    </div>
    <div class="">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="fnUser" class="form-label">First Name</label>
            <input type="text" id="fnUser" class="form-control" v-model="dataUser.firstName" />
          </div>

          <div class="mb-3 mx-2">
            <label for="lnUser" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lnUser" v-model="dataUser.lastName" />
          </div>
          <div class="mb-3 mx-2">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" class="form-control" v-model="dataUser.email" />
          </div>
          <div class="mb-3 mx-2">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="phone" v-model="dataUser.phone" />
          </div>
          <div class="mb-3 mx-2">
            <label for="pwd" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="dataUser.password" id="pwd" />
          </div>

          <div class="mb-3 mx-2">
            <label for="addressUser" class="form-label">Address</label>
            <input type="text" class="form-control" id="addressUser" v-model="dataUser.address" />
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
                v-model="dataUser.gender"
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
                v-model="dataUser.gender"
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
                v-model="dataUser.gender"
              />
              <label class="form-check-label" for="inlineRadio2">Other</label>
            </div>
          </div>
          <div class="mb-3 mx-2">
            <label for="dobUser" class="form-label">Date of birth</label>
            <input type="date" class="form-control" id="dobUser" v-model="dataUser.dateOfBirth" />
          </div>

          <div class="mb-3 mx-2">
            <label for="bioUser" class="form-label">Bio</label>
            <textarea
              id="detailBook"
              name="detailBook"
              rows="4"
              cols="50"
              v-model="dataUser.bio"
            ></textarea>
          </div>
          <div class="gender__form mb-2">
            <label for="" class="form-label me-3 fw-bold">Type: </label>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="Reader"
                v-model="dataUser.type"
                checked
              />
              <label class="form-check-label" for="inlineRadio2">Reader</label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Admin"
                v-model="dataUser.type"
              />
              <label class="form-check-label" for="inlineRadio1">Admin</label>
            </div>
          </div>

          <div class="form__admin" v-if="dataUser.type === 'Admin'">
            <div class="mb-3 mx-2">
              <label for="lnUser" class="form-label">Hire Date</label>
              <input type="date" class="form-control" id="lnUser" />
            </div>

            <div class="mb-3 mx-2">
              <label for="lnUser" class="form-label">Salary</label>
              <input type="text" class="form-control" id="lnUser" />
            </div>
            <div class="mb-3 mx-2">
              <label for="lnUser" class="form-label">Position</label>
              <input type="date" class="form-control" id="lnUser" />
            </div>
          </div>

          <div class="mb-3 mx-2">
            <label for="avtUser" class="form-label">Avatar</label>
            <input type="file" name="avatar" id="avtUser" @change="handleFileUpload" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-4 submit__form">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user.store'
import { Alert } from 'bootstrap/dist/js/bootstrap.bundle.min'
import { reactive } from 'vue'

const dataUser = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  address: '',
  gender: '',
  dateOfBirth: '',
  images: null,
  bio: '',
  type: 'Reader',
  phone: ''
})

const userStore = useUserStore()

const handleSubmit = async () => {
  alert('Comming soon...')
}

const handleFileUpload = (event) => {
  dataUser.images = event.target.files[0]
}
</script>

<style scoped>
.form__wrap {
  height: 80vh;
  width: 40vw;
}

.add__form {
  height: 55vh;
  overflow-y: scroll;
}

.submit__form {
  float: right;
}
</style>