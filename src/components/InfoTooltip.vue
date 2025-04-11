<template>
  <div class="tooltip">
    <slot />
    <span
      class="tooltip-text"
      :class="{ 'highlight-tooltip': highlight }"
    >
      <span class="font-medium">{{ title }}</span>
      <div
        v-if="formula"
        class="mt-1 formula"
      >{{ formula }}</div>
    </span>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  formula: String,
  highlight: Boolean
});
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.tooltip-text {
  visibility: hidden;
  background-color: #1E293B;
  color: white;
  text-align: left;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1;
  width: 300px;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  bottom: 140%;
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -8px;
  border-width: 8px;
  border-style: solid;
  border-color: #1E293B transparent transparent transparent;
}

.tooltip-text.highlight-tooltip {
  background-color: #1E40AF;
  padding: 1.25rem;
  width: 320px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.tooltip-text.highlight-tooltip::after {
  border-color: #1E40AF transparent transparent transparent;
}

.tooltip-text.highlight-tooltip .mt-1 {
  font-size: 1.1em;
  margin-top: 0.75rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
}

.formula {
  white-space: pre-wrap;
  font-family: monospace;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
}
</style> 