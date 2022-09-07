<template>
  <select
    v-model="selectedValue"
    class="p-2 w-full border border-primary-40 rounded focus:outline-none focus:shadow-input bg-white"
  >
    <option
      v-for="item in items"
      :key="item.id"
      :value="item.id"
      :selected="modelValue === item.id"
    >
      {{ item.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: string | null;
  items: {
    id: string;
    label: string;
  }[];
}>();

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
