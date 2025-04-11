<template>
  <div class="space-y-2">
    <label class="block text-gray-700 font-medium">{{ label }}</label>
    <div>
      <input
        :type="type"
        :step="step"
        :value="modelValue"
        @input="updateValue"
        :min="min"
        :max="max"
        class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        :class="{
          'border-gray-300': !error,
          'border-red-500 focus:ring-red-500': error
        }"
      />
      <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFieldValidation } from '../composables/useFieldValidation'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'number'
  },
  step: {
    type: [String, Number],
    default: '1'
  },
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
  },
  fieldName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const error = computed(() => {
  if (!props.fieldName) return ''
  const validation = useFieldValidation(Number(props.modelValue), props.fieldName)
  return validation === true ? '' : validation
})

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', props.type === 'number' ? Number(value) : value)
}
</script>