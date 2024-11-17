<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Edit Author</h3>
      <hr />
    </div>
    <div class="">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="nameAuthor" class="form-label">Name</label>
            <input type="text" class="form-control" id="nameAuthor" v-model="dataAuthor.name" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label">Date of birth</label>
            <input type="date" class="form-control" id="languageBook" v-model="dataAuthor.dob" />
          </div>
          <div class="mb-3 mx-2">
            <label for="detailBook" class="form-label">Description</label>
            <textarea
              id="detailBook"
              name="detailBook"
              rows="4"
              cols="50"
              v-model="dataAuthor.bio"
            ></textarea>
          </div>
          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label">Link website</label>
            <input type="url" class="form-control" id="priceBook" v-model="dataAuthor.link" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-4 submit__form">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthorStore } from '@/stores/author.store'
import { getCurrentInstance, reactive, toRefs } from 'vue'
const instance = getCurrentInstance()
const proxy = instance?.proxy

const props = defineProps({
  author: {
    type: Object,
    required: true
  },
  handleClose: Function
})
const authorStore = useAuthorStore()
const { author } = toRefs(props)
const dataAuthor = reactive({
  name: author.value.name,
  bio: author.value.bio,
  dob: author.value.dob,
  link: author.value.link
})

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    for (const key in dataAuthor) {
      formData.append(key, dataAuthor[key])
    }
    // console.log(formData)
    const res = await authorStore.updateAuthorAction(author.value._id, formData)
    // console.log(res)
    if (res) {
      proxy?.$toast?.add({
        severity: 'contrast',
        group: 'tr',
        summary: 'Success',
        detail: 'Edit book successfully',
        life: 3000
      })
      props.handleClose()
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