<template>
  <div>
    <div class="flex items-start gap-4">
      <div class="bg-grey-light flex-0 basis-28">
        <img
          :src="imageUrl || undefined"
          :width="width"
          :height="height"
          class="w-full h-auto bg-white"
          :class="!imageUrl && 'invisible'"
        />
      </div>
      <div>
        <AppButton is="label" class="mr-2" variant="primaryOutlined">
          <input
            ref="inputRef"
            type="file"
            accept="image/jpeg,image/png"
            class="sr-only"
            @change="handleChange"
          />
          Choose file
        </AppButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import AppButton from './AppButton.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  modelValue: File | null;
  width: number;
  height: number;
  label?: string;
  required?: boolean;
}>();

const inputRef = ref<HTMLInputElement>();

const imageUrl = computed(
  () => props.modelValue && URL.createObjectURL(props.modelValue)
);

function handleChange() {
  const file = inputRef.value?.files?.item(0);
  if (file) {
    emit('update:modelValue', file);
  }
}
</script>
