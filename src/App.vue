<template>
  <div id="app" class="font-serif bg-diagonal">
    <app-header/>
    <main class="py-2">
      <router-view/>
    </main>
    <app-footer/>
  </div>
</template>

<script>
  import AppHeader from './components/Header'
  import AppFooter from './components/Footer'

  export default {
    name: 'app',
    components: {AppHeader, AppFooter},
  }
</script>

<style lang="scss">
  @import "./styles/app";
</style>
