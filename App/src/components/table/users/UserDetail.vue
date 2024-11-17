<template>
  <div class="dBook__wrap p-5">
    <div><h3>Detail Book</h3></div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-sm-3 img__dbook" style="height: 40%">
          <img class="img-thumbnail" :src="user.image" alt="" />
        </div>
        <div class="col-sm-9">
          <Tabs value="0">
            <TabList>
              <Tab value="0">Overview</Tab>
              <Tab value="1">My Books</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="0" class="sroll__fit">
                <table class="table text-start">
                  <tbody>
                    <tr>
                      <th scope="row">#</th>
                      <th>_id</th>
                      <td>{{ user._id }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>First Name</th>
                      <td>{{ user.firstName }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Last Name</th>
                      <td>{{ user.lastName }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Date of birth</th>
                      <td>{{ formatDate(user.dateOfBirth) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Gender</th>
                      <td>
                        {{ user.gender }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Address</th>
                      <td>{{ user.address }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Email</th>
                      <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Role</th>
                      <td>{{ user.role }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Create At</th>
                      <td>{{ formatDateHour(user.createAt) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Update At</th>
                      <td>{{ formatDateHour(user.updateAt) }}</td>
                    </tr>
                  </tbody>
                </table>
              </TabPanel>

              <TabPanel value="1" class="sroll__fit">
                <table class="table text-start">
                  <tbody v-if="user.myBook && user.myBook.length">
                    <tr v-for="(book, index) in user.myBook" :key="index">
                      <th scope="row">#</th>
                      <th></th>
                      <td></td>
                    </tr>
                  </tbody>
                  <div v-else>Updating...</div>
                </table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { toRefs } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
const { user } = toRefs(props)
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}
function formatDateHour(date) {
  // const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Đặt thành `true` nếu bạn muốn định dạng 12 giờ (AM/PM)
  }
  return new Date(date).toLocaleDateString(undefined, options)
}
</script>

<style>
.dBook__wrap {
  width: 80vw;
  height: 80vh;
}

.sroll__fit {
  overflow-y: scroll;
  height: 50vh;
}
.img__dbook {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>