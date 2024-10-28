<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 h-100 slider__wrap" style="width: 280px">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4 iconSlider">LIBRAZONE</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto nav__slider">
      <li class="nav-item">
        <router-link
          class="nav__link"
          :class="{ active: $route.name === 'dashBoard' }"
          :to="{ name: 'home' }"
        >
          <i class="bi bi-house-door me-2"></i> Dashboard
        </router-link>
      </li>
      <li>
        <router-link
          class="nav__link"
          :class="{ active: $route.name === 'user-table' }"
          :to="{ name: 'user-table' }"
        >
          <i class="bi bi-book me-2"></i> Users
        </router-link>
      </li>
      <li>
        <router-link
          class="nav__link"
          :class="{ active: $route.name === 'book-table' }"
          :to="{ name: 'book-table' }"
        >
          <i class="bi bi-book me-2"></i> Books
        </router-link>
      </li>
      <li>
        <router-link
          class="nav__link"
          :class="{ active: $route.name === 'author-table' }"
          :to="{ name: 'author-table' }"
        >
          <i class="bi bi-book me-2"></i> Authors
        </router-link>
      </li>
      <li>
        <router-link
          class="nav__link"
          :class="{ active: $route.name === 'publisher-table' }"
          :to="{ name: 'publisher-table' }"
        >
          <i class="bi bi-book me-2"></i> Publisher
        </router-link>
      </li>
      <li>
        <router-link
          class="nav__link"
          :class="{ active: $route.name === 'borrow-book' }"
          :to="{ name: 'borrow-book' }"
        >
          <i class="bi bi-book me-2"></i> Track
        </router-link>
      </li>
    </ul>
    <hr />
    <div class="dropdown">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src="../image.png" alt="" width="32" height="32" class="rounded-circle me-2" />
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.nav__link {
  color: #fff;
}
.slider__wrap {
  background-color: #fff;
  color: #000;
  border-right: 1px solid #ccc;
}
.nav__link {
  color: #000;
  text-decoration: none;
  font-size: 1.1rem;
}
.iconSlider {
  color: #000;
}

.active {
  border: 1px solid #000;
  padding: 2px 20px 2px 2px;
}
</style>