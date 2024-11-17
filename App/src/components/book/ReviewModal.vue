<template>
  <div class="form__wrap p-5">
    <div class="rating__review">
      <form class="star__raiting w-80 m-auto" @submit.prevent="submitReview">
        <input
          type="radio"
          v-model="star"
          value="1"
          name="rating"
          class="star-1 opacity-0 p-0 m-0 input__star"
          id="star-1"
        />
        <label :class="{ active: star >= 1 }" class="star star-1" property="" for="star-1"
          ><i class="fa fa-splotch"></i
        ></label>
        <input
          type="radio"
          v-model="star"
          value="2"
          name="rating"
          class="star-2 opacity-0 p-0 m-0 input__star"
          id="star-2"
        />
        <label :class="{ active: star >= 2 }" class="star star-2" property="" for="star-2"
          ><i class="fa fa-splotch"></i
        ></label>
        <input
          type="radio"
          v-model="star"
          value="3"
          name="rating"
          class="star-3 opacity-0 p-0 m-0 input__star"
          id="star-3"
        />
        <label :class="{ active: star >= 3 }" class="star star-3" property="" for="star-3"
          ><i class="fa fa-splotch"></i
        ></label>
        <input
          type="radio"
          v-model="star"
          value="4"
          name="rating"
          class="star-4 opacity-0 p-0 m-0 input__star"
          id="star-4"
        />
        <label :class="{ active: star >= 4 }" class="star star-4" property="" for="star-4"
          ><i class="fa fa-splotch"></i
        ></label>
        <input
          type="radio"
          v-model="star"
          value="5"
          name="rating"
          class="star-5 opacity-0 p-0 m-0 input__star"
          id="star-5"
        />
        <label :class="{ active: star >= 5 }" class="star star-5" property="" for="star-5"
          ><i class="fa fa-splotch"></i
        ></label>

        <textarea
          v-model="comment"
          placeholder="Enter your comment..."
          class="comment-input w-100 mt-3"
          rows="10"
        ></textarea>

        <button type="submit" class="submit-btn mt-3">Send</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '@/stores/review.store'
import { getCurrentInstance, ref } from 'vue'
const { proxy } = getCurrentInstance()

const reviewStore = useReviewStore()
const props = defineProps({
  bookId: String,
  handleClose: Function
})
const star = ref(0)
const comment = ref('')

async function submitReview() {
  if (star.value === 0) {
    proxy.$toast.add({
      severity: 'error',
      group: 'tr',
      summary: 'Success',
      detail: 'You have not selected the number of stars!',
      life: 3000
    })
    return
  }

  if (!comment.value.trim()) {
    proxy.$toast.add({
      severity: 'error',
      group: 'tr',
      summary: 'Success',
      detail: 'Comments cannot be empty!',
      life: 3000
    })
    return
  }
  const payload = {
    bookID: props.bookId,
    comment: comment.value,
    star: star.value
  }
  const response = await reviewStore.createReviewAction(payload)
  if (response === 201) {
    proxy.$toast.add({
      severity: 'contrast',
      group: 'tr',
      summary: 'Success',
      detail: 'You have successfully commented!',
      life: 3000
    })
  } else {
    proxy.$toast.add({
      severity: 'error',
      group: 'tr',
      summary: 'Success',
      detail: 'You have already commented on this book!',
      life: 3000
    })
  }
  props.handleClose()
}
</script>

<style scoped>
.rating__review {
  display: flex;
  flex-direction: column;
}

.star {
  position: relative;
  cursor: pointer;
  font-size: 20px;
  color: gray; /* Màu mặc định cho các ngôi sao */
  transition: color 0.3s ease; /* Hiệu ứng chuyển màu mượt mà */
  padding: 2px;
}

.input__star {
  position: absolute;
}

.active {
  color: #000000;
}

/* .star:hover,
.star__raiting:hover .star {
  color: #000000;
}

.star:hover ~ .star {
  color: gray;
} */

.comment-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>