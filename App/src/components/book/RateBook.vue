<template>
  <div class="rating__review">
    <form class="star__raiting w-80 m-auto">
      <input
        type="submit"
        value="1"
        name="rating"
        class="star-1 opacity-0 p-0 m-0 input__star"
        id="star-1"
      />
      <label class="star star-1" property="" for="star-1"><i class="fa fa-splotch"></i></label>
      <input
        type="submit"
        value="1"
        name="rating"
        class="star-2 opacity-0 p-0 m-0 input__star"
        id="star-2"
      />
      <label class="star star-2" property="" for="star-2"><i class="fa fa-splotch"></i></label>
      <input
        type="submit"
        value="1"
        name="rating"
        class="star-3 opacity-0 p-0 m-0 input__star"
        id="star-3"
      />
      <label class="star star-3" property="" for="star-3"><i class="fa fa-splotch"></i></label>
      <input
        type="submit"
        value="1"
        name="rating"
        class="star-4 opacity-0 p-0 m-0 input__star"
        id="star-4"
      />
      <label class="star star-4" property="" for="star-4"><i class="fa fa-splotch"></i></label>
      <input
        type="submit"
        value="1"
        name="rating"
        class="star-5 opacity-0 p-0 m-0 input__star"
        id="star-5"
      />
      <label class="star star-5" property="" for="star-5"><i class="fa fa-splotch"></i></label>
    </form>
  </div>
</template>

<script>
export default {}
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

.star:hover,
.star__raiting:hover .star {
  color: #000000;
}

.star:hover ~ .star {
  color: gray; /* Màu vàng khi hover */
}
</style>