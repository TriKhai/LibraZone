<script setup>
import Toast from 'primevue/toast'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
import DashboardHeader from '@/components/header/DashboardHeader.vue'
</script>

<template>
  <div class="app" id="app">
    <div class="app d-flex h-100">
      <the-sidebar class="the__sidebar"></the-sidebar>
      <div class="main w-100">
        <dashboard-header class="the__header"></dashboard-header>
        <div class="the__main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

  <!-- <Toast /> -->
  <Toast position="top-right" group="tr" />
  <Toast position="bottom-right" group="br" />
</template>

<style scoped>
.app {
  height: 100vh;
}

.the__sidebar {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
}

.the__header {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
}

.the__main {
  margin-left: 18vw;
  margin-top: 11vh;
}
</style>
