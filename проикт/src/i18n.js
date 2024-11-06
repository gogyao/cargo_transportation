import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: 'Home',
        private: 'For Individuals',
        business: 'For Business',
        about: 'About Us',
        contract: 'Sign Contract',
        operators: 'Available Operators',
        carriers: 'Available Carriers',
        login: 'Log in',
        register: 'Register'
      }
    },
    ru: {
      translation: {
        home: 'Главная',
        private: 'Частным лицам',
        business: 'Бизнесу',
        about: 'О компании',
        contract: 'Заключить договор',
        operators: 'Доступные операторы',
        carriers: 'Доступные перевозчики',
        login: 'Войти',
        register: 'Регистрация'
      }
    }
  },
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
