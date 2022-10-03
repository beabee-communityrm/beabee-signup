<template>
  <div class="flex rounded overflow-hidden">
    <div
      class="flex items-center justify-center flex-shrink-0 w-12 text-white"
      :class="iconClasses[type]"
    >
      <font-awesome-icon :icon="['fas', icon]" />
    </div>

    <div
      class="flex items-center flex-grow p-3 text-xs font-semibold"
      :class="contentClasses[type]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'success' | 'warning' | 'error';
  }>(),
  { type: 'error' }
);

const icon = computed(() =>
  props.type === 'success' ? 'check' : 'exclamation'
);

const iconClasses = {
  success: 'bg-success-30',
  warning: 'bg-warning-70',
  error: 'bg-danger-30',
};

const contentClasses = {
  success: 'bg-success text-success',
  warning: 'bg-warning-10 text-primary-80',
  error: 'bg-danger-10 text-danger',
};
</script>
