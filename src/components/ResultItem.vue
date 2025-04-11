<template>
  <div class="result-item" :class="{ highlight }">
    <span class="label">{{ label }}</span>
    <span class="value" :class="{
      'text-green-600': positive === true,
      'text-red-600': positive === false,
      'text-blue-700': highlight
    }">{{ value }}</span>
    <Tooltip v-if="tooltip" :title="tooltip" :formula="formula" :highlight="highlight">
      <svg class="info-icon w-4 h-4" :class="{ 'text-blue-600': highlight }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </Tooltip>
  </div>
</template>

<script setup>
import Tooltip from './Tooltip.vue';

defineProps({
  label: String,
  value: [String, Number],
  tooltip: String,
  formula: String,
  highlight: Boolean,
  positive: Boolean
});
</script>

<style scoped>
.result-item {
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.result-item .label {
  color: #4B5563;
  width: 6rem;
  flex-shrink: 0;
}

.result-item .value {
  font-weight: 600;
  margin-left: 0.5rem;
  flex-grow: 1;
}

.result-item.highlight {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
}

.result-item.highlight .value {
  color: #1E40AF;
  font-size: 1.125rem;
  padding: 0.25rem 0.75rem;
  background: #DBEAFE;
  border-radius: 0.375rem;
}

.info-icon {
  margin-left: 0.5rem;
  cursor: help;
}
</style>
