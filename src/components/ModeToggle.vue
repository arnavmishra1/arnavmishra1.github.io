<script setup>
const mode = defineModel({ type: String, required: true })

function flip() {
  mode.value = mode.value === 'new' ? 'old' : 'new'
}
</script>

<template>
  <div class="toggle" :class="mode">
    <span class="label" :class="{ active: mode === 'old' }" @click="mode = 'old'">old</span>
    <button
      type="button"
      role="switch"
      :aria-checked="mode === 'new'"
      aria-label="Switch between old and new site design"
      class="track"
      @click="flip"
    >
      <span class="knob" />
    </button>
    <span class="label" :class="{ active: mode === 'new' }" @click="mode = 'new'">new</span>
  </div>
</template>

<style scoped>
.toggle {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}

.label {
  cursor: pointer;
}

.track {
  position: relative;
  padding: 0;
  cursor: pointer;
}

.knob {
  position: absolute;
  top: 3px;
  left: 3px;
}

/* ---- new: quiet pill switch ---- */
.new {
  font: 500 13px/1 system-ui, -apple-system, 'Segoe UI', sans-serif;
  letter-spacing: 0.02em;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
}
.new .label {
  color: #a3a3a3;
  transition: color 0.2s;
}
.new .label.active {
  color: #111;
}
.new .track {
  width: 40px;
  height: 22px;
  border: 0;
  border-radius: 999px;
  background: #111;
  transition: background 0.25s;
}
.new .knob {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(18px);
  transition: transform 0.25s ease;
}
.new .track:focus-visible {
  outline: 2px solid #111;
  outline-offset: 3px;
}

/* ---- old: Windows 95 bevels ---- */
.old {
  font: bold 14px 'MS Sans Serif', Tahoma, Arial, sans-serif;
  background: #c0c0c0;
  padding: 4px 8px;
  border: 2px outset #fff;
}
.old .label {
  color: #808080;
}
.old .label.active {
  color: #000;
  text-decoration: underline;
}
.old .track {
  width: 44px;
  height: 22px;
  background: #fff;
  border: 2px inset #808080;
  border-radius: 0;
}
.old .knob {
  top: 1px;
  left: 1px;
  width: 18px;
  height: 16px;
  background: #c0c0c0;
  border: 2px outset #fff;
}

@media (max-width: 640px) {
  .toggle {
    top: 12px;
    right: 12px;
  }
}
</style>
