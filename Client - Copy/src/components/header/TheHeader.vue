<template>
  <div class="container-fluid">
    <nav
      class="navbar-wrap navbar navbar-expand navbar-light bg-light"
      aria-label="Second navbar example"
    >
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarsExample02">
        <header-search></header-search>
        <header-body></header-body>
        <header-login></header-login>
      </div>
    </nav>
    <hr class="mt-0" />
  </div>
</template>

<script setup>
import HeaderSearch from './HeaderSearch.vue'
import HeaderBody from './HeaderBody.vue'
import HeaderLogin from './HeaderLogin.vue'
</script>

<style>
.btn-header-bar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ebedf2;
  transition: all 0.5s;
}

.btn-search-header {
  border: 1px solid #ebedf2;
}

.input-search-header:hover,
.btn-header-bar:hover {
  border: 1px solid #000;
}
</style>