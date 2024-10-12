<template>
  <div class="dBook__wrap p-5">
    <div><h3>Detail Book</h3></div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-sm-3 img__dbook" style="height: 40%">
          <img class="img-thumbnail" :src="imgAuthor" />
        </div>
        <div class="col-sm-9">
          <Tabs value="0">
            <TabList>
              <Tab value="0">Overview</Tab>
              <Tab value="1">Story</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="0" class="sroll__fit">
                <table class="table text-start">
                  <tbody>
                    <tr>
                      <th scope="row">#</th>
                      <th>_id</th>
                      <td>{{ author._id }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Name</th>
                      <td>{{ author.name }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Description</th>
                      <td>{{ author.bio }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Date of birth</th>
                      <td>{{ author.dob }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Link</th>
                      <td>
                        <a :href="author.link">{{ author.link }}</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Image</th>
                      <td>{{ author.image }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Create At</th>
                      <td>{{ author.createAt }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Update At</th>
                      <td>{{ author.updateAt }}</td>
                    </tr>
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel value="1" class="sroll__fit">
                <table class="table text-start">
                  {{
                    author.bio
                  }}
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
import { ref, toRefs } from 'vue'

const props = defineProps({
  author: {
    type: Object,
    required: true
  }
})
const { author } = toRefs(props)
const imgAuthor = ref('http://localhost:3000/' + author.value.image)
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