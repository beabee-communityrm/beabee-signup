<template>
  <div>
    <input
      v-model="value"
      class="p-2 w-full border border-primary-40 rounded focus:outline-none focus:shadow-input"
      :class="validation.value.$error && 'bg-danger-10 border-danger-70'"
      :type="type"
      :required="required"
      v-bind="$attrs"
      @blur="validation.$touch"
    />

    <div
      v-if="validation.value.$error"
      class="text-xs text-danger font-semibold mt-1.5"
      role="alert"
    >
      {{ validation.value.$errors[0].$message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, requiredIf } from '@vuelidate/validators';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  modelValue: unknown;
  type?: string;
  required?: boolean;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const rules = computed(() => ({
  value: {
    required: requiredIf(!!props.required),
    ...(props.type === 'email' && { email }),
  },
}));

const validation = useVuelidate(rules, { value });
</script>
