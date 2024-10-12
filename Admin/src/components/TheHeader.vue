<template>
  <nav
    class="py-3 navbar-wrap navbar navbar-expand navbar-light bg-light wrap__header"
    aria-label="Second navbar example"
  >
    <div class="container-fluid">
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarsExample02">
        <div class="navbar-left d-flex">
          <div
            class="home-bar btn-header-bar me-3 p-2 d-flex justify-content-center align-items-center"
          >
            <i class="fa fa-dot-circle"></i>
          </div>
          <form role="search">
            <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
        <div class="navbar-right">
          <ul class="navbar-nav me-auto">
            <li
              class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2"
            >
              <router-link class="text-dark" :to="{ name: 'log-in' }"
                ><i class="fa fa-sign-in-alt"></i
              ></router-link>
            </li>
            <li
              class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2"
            >
              <a class="nav-link" href="#"><i class="fa fa-user-circle"></i></a>
            </li>
            <li
              class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2"
            >
              <a class="nav-link" href="#"><i class="fa fa-user-circle"></i></a>
            </li>
            <li
              class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2"
            >
              <a class="nav-link" href="#">
                <img src="../image.png" class="img-fluid rounded" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.btn-header-bar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ebedf2;
  color: #000;
}
.wrap__header {
  border-bottom: 1px solid #ccc;
}
</style>