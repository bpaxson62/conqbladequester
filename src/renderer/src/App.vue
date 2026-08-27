<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Versions from './components/Versions.vue'

const appVersion = ref('')

onMounted(async () => {
  appVersion.value = await window.api.getVersion()
})
</script>

<template>
  <div class="app">
    <h1>My Electron App</h1>
    <p>Edit <code>src/renderer/src/App.vue</code> and save to see changes.</p>
    <p>App version: {{ appVersion }}</p>
    <Versions />
  </div>
</template>

<style>
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
.app {
  padding: 2rem;
}
code {
  background: #2b2d31;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}
</style>
