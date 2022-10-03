import { Library, library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faCircleNotch,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { App } from 'vue';

library.add(faCircleNotch, faExclamation, faCheck);

export default {
  install(app: App): Library {
    app.component('FontAwesomeIcon', FontAwesomeIcon);

    return library;
  },
};
