import Vue from 'vue';
import VueI18n from 'vue-i18n';
import iViewEnLocale from 'iview/dist/locale/en-US';
import iViewZhLocale from 'iview/dist/locale/zh-CN';
import iViewKoLocale from 'iview/dist/locale/ko-KR';
import enLocale from './en-US';
import zhLocale from './zh-CN';
import koLocale from './ko-KR';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...iViewEnLocale
  },
  kor: {
    ...koLocale,
    ...iViewKoLocale
  },
  zh: {
    ...zhLocale,
    ...iViewZhLocale
  }
}

const i18n = new VueI18n({
  locale: 'zh',
  messages
})

export default i18n