<template>
  <div class="container">
    <hr />
    <footer class="py-3 mt-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item" v-for="(navOptions, index) in navFooter" :key="index">
          <a href="#" class="nav-link px-2 text-body-secondary">{{ navOptions }}</a>
        </li>
      </ul>
      <p class="text-center text-body-secondary">{{ contentFooter }}</p>
    </footer>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  setup() {
    const navFooter = reactive(['Home', 'Features', 'Pricing', 'FAQs', 'About'])
    const contentFooter = ref('© 2024 Company, Inc')
    return {
      navFooter,
      contentFooter
    }
  }
}
</script>

<style>
</style>