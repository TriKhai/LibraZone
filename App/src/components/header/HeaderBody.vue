<template>
  <div class="navbar__body header__body">
    <ul class="navbar-nav me-auto">
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link
          class="nav-link"
          :to="{ name: 'home' }"
          :class="{ active: $route.name === 'home' }"
          >Home</router-link
        >
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link
          class="nav-link"
          :to="{ name: 'about-us' }"
          :class="{ active: $route.name === 'about-us' }"
          >About Us</router-link
        >
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link
          class="nav-link"
          :to="{ name: 'my-book' }"
          :class="{ active: $route.name === 'my-book' }"
          >My Books</router-link
        >
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link
          class="nav-link"
          :to="{ name: 'books' }"
          :class="{ active: $route.name === 'books' }"
          >List Books</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style scoped>
.active {
  font-weight: bolder;
}

@media (max-width: 992px) {
  .header__body {
    display: none;
  }
}
</style>