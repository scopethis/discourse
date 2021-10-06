import { createApp } from 'vue'
import App from './App.vue'
import './styles/base.css'

const app = createApp(App)

app.directive('visible', function (el: any, binding: any) {
    el.style.visibility = !!binding.value ? 'visible' : 'hidden';
  });
app.mount('#app')
