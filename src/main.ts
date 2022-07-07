import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import icons from './lib/icons';
import './index.css';

const app = createApp(App);
app.use(router);
app.use(icons);

app.mount('#app');
