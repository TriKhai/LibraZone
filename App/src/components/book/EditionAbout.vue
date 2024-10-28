x      
<template>
  <div class="card edition__about col-8">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Overview</Tab>
        <Tab value="1">Author</Tab>
        <Tab value="2">Review</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <book-about :book="bookDetail"></book-about>
        </TabPanel>
        <TabPanel value="1">
          <author-book :author="bookDetail.author"></author-book>
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
            mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
            nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import BookAbout from './BookAbout.vue'
import AuthorBook from './AuthorBook.vue'

defineProps({
  bookDetail: {
    type: Object
  }
})
</script>

<style scoped>
.edition__about {
  border: 2px solid #ccc;
  border-radius: 8px;
  /* width: 80%; */
  padding: 20px;
  transition: all 0.5s;
}

.edition__about:hover {
  cursor: pointer;
  border-color: #000;
}
</style>