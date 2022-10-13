<template>
  <div class="container mx-auto p-4">
    <Heading>
      Uptime Charts for Albion Online
    </Heading>
    <AppContent class="py-4 prose lg:prose-lg max-w-none" />
    <ClientOnly>
      <LazyUptimeChart class="mt-8" />
    </ClientOnly>
  </div>
</template>
