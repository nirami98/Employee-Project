import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Toasted, {
  duration: 3000,
  position: 'bottom-right', // ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']
  theme: 'outline', // ['toasted-primary', 'outline', 'bubble']
  iconPack: 'custom-class' // ['material', 'fontawesome', 'mdi', 'custom-class', 'callback']
})

Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
