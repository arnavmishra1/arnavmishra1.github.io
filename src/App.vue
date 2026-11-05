<script setup>
import { ref, watch } from 'vue'
import NewSite from './components/NewSite.vue'
import OldSite from './components/OldSite.vue'
import ModeToggle from './components/ModeToggle.vue'

const KEY = 'portfolio-mode'

function savedMode() {
  // ?mode=old or ?mode=new in the URL wins, so you can share a link to either.
  const fromUrl = new URLSearchParams(location.search).get('mode')
  if (fromUrl === 'old' || fromUrl === 'new') return fromUrl
  try {
    return localStorage.getItem(KEY) === 'old' ? 'old' : 'new'
  } catch {
    return 'new'
  }
}

const mode = ref(savedMode())

watch(
  mode,
  (m) => {
    document.documentElement.dataset.mode = m
    try {
      localStorage.setItem(KEY, m)
    } catch {
      // Storage blocked (private window etc.); the toggle still works.
    }
  },
  { immediate: true },
)
</script>

<template>
  <ModeToggle v-model="mode" />
  <OldSite v-if="mode === 'old'" />
  <NewSite v-else />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

html[data-mode='new'] {
  scroll-behavior: smooth;
  background: #fff;
}

@media (prefers-reduced-motion: reduce) {
  html[data-mode='new'] {
    scroll-behavior: auto;
  }
}
</style>
