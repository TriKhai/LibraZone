<template>
  <div class="navbar-left d-flex align-items-center">
    <div class="logo-wrap">
      <router-link :to="{ name: 'library' }">
        <img
          class="me-2"
          width="80px"
          height="80px"
          src="/src/assets/images/logo/logo-librazone.png"
          alt=""
        />
      </router-link>
    </div>

    <form role="search" class="d-flex search__form">
      <div class="">
        <input
          class="form-control input-search-header"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </div>

      <button
        class="btn-search-header btn-header-bar ms-3 p-2 d-flex justify-content-center align-items-center text-dark"
        type="submit"
      >
        <i class="fa fa-search"></i>
      </button>
    </form>
  </div>
</template>

<script setup>
</script>

<style scoped>
.search__form {
  position: relative;
}
.propose__search {
  display: none;
  position: absolute;
  z-index: 10;
  background-color: #ccc;
  left: 0;
  top: 6vh;
  width: 150%;
  border-radius: 8px;
}
ul {
  padding: 0 7px;
}

ul,
li {
  margin: 0;
  text-align: left;

  font-size: 0.9rem;
  /* border-bottom: 1px solid; */
}

ul li {
  list-style: none;
  padding: 7px;
  transition: all 0.5s;
  border: 1px solid #ccc;
  border-radius: 8px;
}

ul li:hover {
  border-color: #000;
}

ul li a img {
  width: 40px;
  min-width: 40px;
  height: 60px;
  min-height: 60px;
  background-color: #ededed;
  margin-right: 10px;
  object-fit: cover;
}
</style>