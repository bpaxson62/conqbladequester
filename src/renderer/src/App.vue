<script setup lang="ts">
import { onMounted } from 'vue'
import { useUnlockStore } from './stores/unlocks'
import SeasonsPage from './components/SeasonsPage.vue'

const store = useUnlockStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <div class="app">
    <header>
      <h1>Quest Tracker</h1>
    </header>

    <main v-if="store.loaded">
      <SeasonsPage />
    </main>
    <main
      v-else
      class="loading"
    >
      Loading…
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  background: #1e1f22;
  color: #e6e6e6;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #2b2d31;
}
h1 {
  font-size: 1.1rem;
  margin: 0;
}
main {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
.loading {
  color: #9a9ba0;
}
</style>
