<template>
  <header class="w-full text-center p-6 pb-2">
    <a
      href="/"
      class="no-underline"
      @click.prevent="$route.path === '/' ? $router.go() : $router.replace('/')">
      <img
        src="~/assets/logo.png"
        alt="AlbionStatus logo">
    </a>
  </header>
</template>
