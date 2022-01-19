import { createI18n } from 'vue-i18n';

import en from './lang/en';
import ru from './lang/ru';
import es from './lang/es';

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'ru', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    ru,
    es,
  },
});

export default i18n;
