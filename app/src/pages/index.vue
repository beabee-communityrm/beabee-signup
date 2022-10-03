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

  <div v-if="isDone">
    <AppMessageBox type="success">
      Done! We've received your request and will be in touch soon
    </AppMessageBox>
  </div>

  <form v-else @submit.prevent="handleSubmit">
    <section class="mb-8">
      <h3 class="subheading">Your account</h3>
      <div class="details-grid">
        <span class="label">First name</span>
        <AppInput v-model="orgData.firstName" required />
        <span class="label">Last name</span>
        <AppInput v-model="orgData.lastName" required />
        <span class="label">Email</span>
        <AppInput v-model="orgData.email" type="email" required />
        <span class="label">Password</span>
        <AppInput v-model="orgData.password" type="password" required />
      </div>
    </section>

    <section class="mb-8">
      <h3 class="subheading">Your organisation</h3>
      <div class="details-grid">
        <span class="label">Name</span>
        <AppInput v-model="orgData.organisationName" required />
        <span class="label">Address line 1</span>
        <AppInput v-model="orgData.addressLine1" required />
        <span class="label">Address line 2</span>
        <AppInput v-model="orgData.addressLine2" />
        <span class="label">City/town</span>
        <AppInput v-model="orgData.cityOrTown" required />
        <span class="label">Postcode</span>
        <AppInput v-model="orgData.postcode" class="w-40" required />
        <span class="label">Country</span>
        <AppSelect v-model="orgData.country" :items="availableCountries" />
        <span class="label">Logo</span>
        <AppImageUpload v-model="orgLogo" :width="100" :height="100" />
        <span class="label">Language</span>
        <div>
          <AppSelect
            v-model="orgData.locale"
            :items="availableLocales"
            class="w-auto max-w-full"
          />
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="font-semibold text-xl mb-4">Almost done!</h2>
      <p class="mb-4">Lots of text</p>

      <AppCheckbox
        v-model="readAgreements"
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

    <AppMessageBox v-if="error" class="mb-4">
      {{ error }}
    </AppMessageBox>

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
import axios from 'axios';
import slugify from 'slugify';
import { computed, reactive, ref } from 'vue';
import countries from 'countries-list/dist/minimal/countries.en.min.json';
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import AppInput from '../components/AppInput.vue';
import AppCheckbox from '../components/AppCheckbox.vue';
import AppSelect from '../components/AppSelect.vue';
import AppImageUpload from '../components/AppImageUpload.vue';
import AppButton from '../components/AppButton.vue';
import AppMessageBox from '../components/AppMessageBox.vue';
import { isApiError } from '../utils';

function subdomainify(s: string) {
  return slugify(s, { lower: true, strict: true, remove: / /g })
    .substring(0, 63)
    .replace(/[^a-z0-9-]/g, '');
}

const customSubdomain = ref('');
const autoSubdomain = computed(() => subdomainify(orgData.organisationName));
const subdomain = computed({
  get: () => customSubdomain.value || autoSubdomain.value,
  set: (newValue) => (customSubdomain.value = subdomainify(newValue)),
});

const availableLocales = [
  { id: 'en', label: 'English' },
  { id: 'de', label: 'German' },
  { id: 'de@informal', label: 'German (informal)' },
];
const availableCountries = Object.entries(countries)
  .map(([id, label]) => ({
    id,
    label,
  }))
  .sort((a, b) => (a.label < b.label ? -1 : 1));

const errorMessages = {
  'invalid-logo-mime-type': 'Logo must be a PNG or JPG',
  'duplicate-organisation-id':
    'Organisation ID already exists, please use another',
  unknown: 'Something went wrong, please contact hello@beabee.io',
} as const;

const orgData = reactive({
  firstName: 'First',
  lastName: 'Last',
  email: 'name@email.com',
  password: '123566',
  organisationName: 'Organisation',
  addressLine1: 'Line 1',
  addressLine2: '',
  cityOrTown: 'Bristol',
  country: 'GB',
  postcode: 'BS1',
  locale: 'en',
});

const orgLogo = ref<null | File>(null);
const readAgreements = ref(true);

const error = ref('');
const loading = ref(false);
const isDone = ref(false);

const validation = useVuelidate(
  { orgLogo: { required }, readAgreements: { yes: sameAs(true) } },
  { orgLogo, readAgreements }
);

async function handleSubmit() {
  if (orgLogo.value) {
    const data = new FormData();
    data.append('logo', orgLogo.value);
    data.append('data', JSON.stringify({ ...orgData, id: subdomain.value }));

    error.value = '';
    loading.value = true;
    isDone.value = true;
    try {
      await axios.post('/api/1.0/organisation', data);
    } catch (err) {
      error.value =
        errorMessages[isApiError(err) ? err.response.data.code : 'unknown'];
    }
  }
}
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
