<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Edit Publisher</h3>
      <hr />
    </div>
    <div class="">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="titleBook" class="form-label">Name</label>
            <input type="text" class="form-control" id="titleBook" v-model="dataPublisher.name" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label">Location</label>
            <input type="text" class="form-control" v-model="dataPublisher.location" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label">Established Year</label>
            <input type="text" class="form-control" v-model="dataPublisher.establishedYear" />
          </div>

          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="priceBook"
              v-model="dataPublisher.contact.email"
            />
          </div>
          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label">Phone</label>
            <input
              type="text"
              class="form-control"
              id="priceBook"
              v-model="dataPublisher.contact.phone"
            />
          </div>
          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label">Website</label>
            <input
              type="text"
              class="form-control"
              id="priceBook"
              v-model="dataPublisher.contact.website"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-4 submit__form">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { usePublishersStore } from '@/stores/publisher.store'
import { reactive, toRefs } from 'vue'

const props = defineProps({
  publisher: {
    type: Object,
    required: true
  }
})
const pubStore = usePublishersStore()
const { publisher } = toRefs(props)
const dataPublisher = reactive({
  name: publisher.value.name,
  location: publisher.value.location,
  establishedYear: publisher.value.establishedYear,
  contact: {
    email: publisher.value.contact.email,
    phone: publisher.value.contact.phone,
    website: publisher.value.contact.website
  }
})

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    for (const key in dataPublisher) {
      if (key === 'contact') {
        for (const contactKey in dataPublisher.contact) {
          formData.append(`contact[${contactKey}]`, dataPublisher.contact[contactKey])
        }
      } else {
        formData.append(key, dataPublisher[key])
      }
    }
    // console.log(formData)
    const res = await pubStore.updatePublisherAction(publisher.value._id, formData)
    // console.log(res)
    if (res) {
      alert('Book added successfully!')
    }
  } catch (error) {
    console.error('Error adding book:', error)
    alert('Failed to add book. Please try again.')
  }
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
</style>