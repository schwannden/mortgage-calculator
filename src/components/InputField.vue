<template>
  <div class="space-y-2">
    <label class="block text-gray-700 font-medium">{{ label }}</label>
    <input
      :type="type"
      :step="step"
      :value="modelValue"
      @input="updateValue"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'number'
  },
  step: {
    type: [String, Number],
    default: '1'
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  const value = event.target.value;
  emit('update:modelValue', props.type === 'number' ? Number(value) : value);
};
</script>
