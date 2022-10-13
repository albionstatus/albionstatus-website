<template>
  <section class="flex flex-col items-center mt-6">
    <Heading class="my-2">
      Nothing to see here!
    </Heading>
    <p class="leading-loose mt-4">
      Looks like you took a wrong path!
    </p>
    <NuxtLink
      to="/"
      class="gray-900 my-4"
    >
      Back
  </NuxtLink>
    <img src="https://thecatapi.com/api/images/get?format=src&type=gif">
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head () {
    return {
      title: `${this.error.statusCode} - No server status here!`
    }
  }
}
</script>
