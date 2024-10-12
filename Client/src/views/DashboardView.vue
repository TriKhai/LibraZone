<script setup>
import Toast from 'primevue/toast'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
import DashboardHeader from '@/components/header/DashboardHeader.vue'
</script>

<template>
  <div class="app" id="app">
    <div class="app d-flex h-100">
      <the-sidebar></the-sidebar>
      <div class="main w-100">
        <dashboard-header></dashboard-header>
        <div class="">
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
</style>
