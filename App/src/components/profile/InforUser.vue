<template>
  <div class="info__user col-12 col-sm-7 d-flex justify-content-center">
    <div class="" v-if="user && user.image">
      <div class="info__basic">
        <div class="user__name">
          <h2 class="fw-bold mb-0">{{ user.firstName + ' ' + user.lastName }}</h2>
          <p class="fs-5 fst-italic">{{ user.role }}</p>
        </div>
        <hr class="my-1" />
        <div class="profile-details">
          <div class="detail-item">
            <label>Email: </label>
            <span>{{ user.email }}</span>
          </div>

          <div class="detail-item">
            <label>Phone: </label>
            <span v-if="user.phone !== ''">{{ user.phone }}</span>
            <span v-else>updating...</span>
          </div>

          <div class="detail-item">
            <label>Date of Birth: </label>
            <span>{{ formatDate(user.dateOfBirth) }}</span>
          </div>

          <div class="detail-item">
            <label>Gender: </label>
            <span>{{ user.gender }}</span>
          </div>

          <div class="detail-item">
            <label>Address: </label>
            <span>{{ user.address }}</span>
          </div>

          <div class="detail-item">
            <label>Bio: </label>
            <span>{{ user.bio || 'No bio available' }}</span>
          </div>
        </div>

        <div class="profile__admin" v-if="admin">
          <hr class="my-1" />
          <div class="detail-item">
            <label>Position: </label>
            <span>{{ admin.position }}</span>
          </div>
          <div class="detail-item">
            <label>Hire Date: </label>
            <span>{{ formatDate(admin.hireDate) }}</span>
          </div>
          <div class="detail-item">
            <label>Salary: </label>
            <span>{{ admin.salary }}</span>
          </div>
        </div>
      </div>
      <hr />
      <div class="feature__user">
        <button class="me-2 mb-2 px-2 py-1" title="My Books" @click="handleClickMyBooks()">
          My Books
        </button>
        <button class="me-2 mb-2 px-2 py-1" title="History" @click="handleClickHistory()">
          History
        </button>
        <button class="me-2 mb-2 px-2 py-1" title="My Review" @click="handleClickReview()">
          My Review
        </button>
        <button class="me-2 mb-2 px-2 py-1" title="Edit Profile" @click="handleClickEdit()">
          Edit Profile
        </button>
        <button
          class="me-2 mb-2 px-2 py-1"
          title="Change Password"
          @click="handleClickChangePasssword()"
        >
          Change Password
        </button>
        <button
          v-if="user.role === 'admin'"
          class="me-2 mb-2 px-2 py-1"
          title="Go to Dashboard"
          @click="handleGoToDashboard()"
        >
          Dashboard
        </button>
      </div>
      <Teleport to="#app">
        <main-modal :isOpen="isOpen" :handleClose="handleClose">
          <template #editProfile>
            <edit-profile :handleClose="handleClose"></edit-profile>
          </template>
        </main-modal>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/admin.store'
import EditProfile from './EditProfile.vue'
import { useUserStore } from '@/stores/user.store'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const adminStore = useAdminStore()
const user = computed(() => userStore.getUser)

const router = useRouter()

// function handleClickUpdating() {
//   alert('Updating...')
// }

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

function handleClickMyBooks() {
  router.push({ name: 'my-book' })
}

function handleGoToDashboard() {
  router.push({ name: 'dashboard' })
}

function handleClickHistory() {
  router.push({ name: 'profile-history' })
}

function handleClickReview() {
  router.push({ name: 'profile-review' })
}

function handleClickChangePasssword() {
  router.push({ name: 'change-password' })
}

const isOpen = ref(false)
function handleClickEdit() {
  isOpen.value = true
}
function handleClose() {
  isOpen.value = false
}

onMounted(async () => {
  await adminStore.fetchAdmin()
})

const admin = computed(() => adminStore.getAdmin)
</script>


<style>
.info__basic {
  color: #334155;
}
.detail-item label {
  margin-right: 3px;
  font-weight: bold;
  color: #334155;
}
.feature__user button {
  border-radius: 8px;
  border: 1px solid #c8c8c8;
}
.feature__user button:hover {
  border-color: #000;
}
</style>