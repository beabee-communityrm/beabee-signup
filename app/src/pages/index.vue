<template>
  <h1 class="font-title text-2xl font-semibold mb-4">
    Let's set up your organisation's space
  </h1>
  <p class="mb-8">
    Once we're done with a handful of questions, you'll have a space where you
    can bring in your <b>newsletter contacts</b>, set up your
    <b>membership revenue stream</b> and put <b>surveys</b> out to your
    audience.
  </p>

  <form @submit.prevent>
    <section class="mb-8">
      <h3 class="subheading">Your account</h3>
      <div class="details-grid">
        <span class="label">First name</span>
        <AppInput v-model="formData.firstName" required />
        <span class="label">Last name</span>
        <AppInput v-model="formData.lastName" required />
        <span class="label">Email</span>
        <AppInput v-model="formData.email" type="email" required />
        <span class="label">Password</span>
        <AppInput v-model="formData.password" type="password" required />
      </div>
    </section>

    <section class="mb-8">
      <h3 class="subheading">Your organisation</h3>
      <div class="details-grid">
        <span class="label">Name</span>
        <AppInput v-model="formData.organisationName" required />
        <span class="label">Address line 1</span>
        <AppInput v-model="formData.addressLine1" required />
        <span class="label">Address line 2</span>
        <AppInput v-model="formData.addressLine2" />
        <span class="label">City/town</span>
        <AppInput v-model="formData.cityOrTown" required />
        <span class="label">Postcode</span>
        <AppInput v-model="formData.postcode" class="w-40" required />
        <span class="label">Logo</span>
        <AppImageUpload v-model="formData.logo" :width="100" :height="100" />
        <span class="label">Language</span>
        <div>
          <AppSelect
            v-model="formData.language"
            :items="availableLanguages"
            class="w-auto"
          />
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="font-semibold text-xl mb-4">Almost done!</h2>
      <p class="mb-4">Lots of text</p>

      <AppCheckbox
        v-model="formData.readAgreements"
        label="I have read and agree to the service and data processing agreements."
        class="font-semibold"
      />
    </section>

    <section class="mb-8">
      <div
        class="flex justify-center items-center gap-2 max-w-[20rem] mx-auto text-lg"
      >
        <AppInput v-model="subdomain" />
        <span>.beabee.io</span>
      </div>
    </section>

    <p class="text-center">
      <AppButton
        variant="link"
        type="submit"
        :disabled="validation.$invalid"
        class="w-40"
      >
        Launch
      </AppButton>
    </p>
  </form>
</template>
<script lang="ts" setup>
import slugify from 'slugify';
import { computed, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import AppInput from '../components/AppInput.vue';
import AppCheckbox from '../components/AppCheckbox.vue';
import AppSelect from '../components/AppSelect.vue';
import AppImageUpload from '../components/AppImageUpload.vue';
import AppButton from '../components/AppButton.vue';

function subdomainify(s: string) {
  return slugify(s, { lower: true, strict: true, remove: / /g })
    .substring(0, 63)
    .replace(/[^a-z0-9-]/g, '');
}

const customSubdomain = ref('');
const autoSubdomain = computed(() => subdomainify(formData.organisationName));
const subdomain = computed({
  get: () => customSubdomain.value || autoSubdomain.value,
  set: (newValue) => (customSubdomain.value = subdomainify(newValue)),
});

const availableLanguages = [
  { id: 'en', label: 'English' },
  { id: 'de', label: 'German' },
  { id: 'de@informal', label: 'German (informal)' },
];

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  organisationName: '',
  addressLine1: '',
  addressLine2: '',
  cityOrTown: '',
  postcode: '',
  logo: '',
  language: 'en',
  readAgreements: false,
});

const validation = useVuelidate(
  { logo: { required }, readAgreements: { yes: sameAs(true) } },
  formData
);
</script>
<style scoped>
.subheading {
  @apply font-light text-body-80 mb-4;
}
.label {
  @apply block font-semibold mb-0.5 sm:text-right sm:leading-10 mt-2 sm:m-0;
}
.details-grid {
  @apply sm:grid grid-cols-[130px_1fr] gap-4;
}
</style>
