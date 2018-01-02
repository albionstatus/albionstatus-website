<template>
  <header class="w-full text-center p-6 pb-2">
    <a @click.prevent="$route.path === '/' ? $router.go() : $router.replace('/')" href="/" class="no-underline">
      <img src="../assets/logo.png" alt="AlbionStatus">
    </a>
  </header>
</template>
