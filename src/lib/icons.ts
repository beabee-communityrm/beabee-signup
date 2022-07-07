import { Library, library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { App } from 'vue';

library.add(faCircleNotch);

export default {
  install(app: App): Library {
    app.component('FontAwesomeIcon', FontAwesomeIcon);

    return library;
  },
};
