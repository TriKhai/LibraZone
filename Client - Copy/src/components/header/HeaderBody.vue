<template>
  <div class="navbar__body">
    <ul class="navbar-nav me-auto">
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link class="nav-link active" :to="{ name: 'home' }">Home</router-link>
        <!-- <a class="nav-link active" aria-current="page" href="#">My Books</a> -->
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link class="nav-link" :to="{ name: 'about-us' }">About Us</router-link>
        <!-- <a class="nav-link" href="#">About Us</a> -->
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link class="nav-link" :to="{ name: 'my-book' }">My Books</router-link>
        <!-- <a class="nav-link active" aria-current="page" href="#">My Books</a> -->
      </li>
      <li class="nav-item d-flex justify-content-center align-items-center ms-2">
        <router-link class="nav-link" :to="{ name: 'books' }">List Books</router-link>
        <!-- <a class="nav-link" href="#">List Books</a> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style>
</style>