import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import 'element-plus/dist/index.css';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        name: this.name,
        mountParcel: this.mountParcel,
        // singleSpa: this.singleSpa,
      });
    },
  },
  handleInstance(app) {
    app.use(i18n);
    app.use(router);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
