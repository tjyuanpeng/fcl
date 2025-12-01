<script setup lang="ts">
import { ContextProvider } from 'promise-portal'
</script>

<template>
  <ContextProvider>
    <router-view />
  </ContextProvider>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app::before,
#app::after {
  content: '';
  display: table;
  height: 0;
}
</style>
