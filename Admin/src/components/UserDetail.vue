<template>
  <div class="dBook__wrap p-5">
    <div><h3>Detail Book</h3></div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-sm-3 img__dbook" style="height: 40%">
          <img class="img-thumbnail" src="https://covers.openlibrary.org/b/id/36314-M.jpg" alt="" />
        </div>
        <div class="col-sm-9">
          <Tabs value="0">
            <TabList>
              <Tab value="0">Overview</Tab>
              <Tab value="1">Story</Tab>
              <Tab value="2">My Books</Tab>
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
                      <td>{{ user.dateOfBirth }}</td>
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
                      <th>Password</th>
                      <td>{{ user.password }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Image</th>
                      <td>{{ user.images }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Type</th>
                      <td>{{ user.type }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Create At</th>
                      <td>{{ user.createAt }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Update At</th>
                      <td>{{ user.updateAt }}</td>
                    </tr>
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel value="1" class="sroll__fit">
                <table class="table text-start">
                  updating...
                  {{
                    user.bio
                  }}
                </table>
              </TabPanel>
              <TabPanel value="2" class="sroll__fit">
                <table class="table text-start">
                  <tbody v-if="user.myBook && user.myBook.length">
                    <tr v-for="(book, index) in user.myBook" :key="index">
                      <th scope="row">#</th>
                      <th></th>
                      <td></td>
                    </tr>
                  </tbody>
                  <div v-else>Empty</div>
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
// const imgUser = ref('http://localhost:3000/' + user.value.images)
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
  /* height: 100em; */
}
</style>