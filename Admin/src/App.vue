<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheSlider from '@/components/TheSlider.vue'
import Toast from 'primevue/toast'
</script>

<template>
  <div class="app" id="app">
    <div class="app d-flex h-100">
      <the-slider v-if="$route.name !== 'log-in'"></the-slider>
      <div class="main w-100">
        <the-header></the-header>
        <div class="">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

  <!-- <Toast /> -->
  <Toast position="top-right" group="tr" />
  <Toast position="top-left" group="tl" />
  <Toast position="bottom-left" group="bl" />
  <Toast position="bottom-right" group="br" />
</template>

<style scoped>
.app {
  height: 100vh;
}
</style>
