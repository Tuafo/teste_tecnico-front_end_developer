/**
 * Arquivo principal de inicialização do Vue
 * 
 * Este arquivo é o ponto de entrada da aplicação Vue.js.
 * Ele é responsável por:
 * - Importar o Vue e criar a aplicação
 * - Importar o componente raiz (App.vue)
 * - Importar os estilos globais
 * - Montar a aplicação no elemento #app do HTML
 */

import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.less'

// Cria e monta a aplicação Vue no elemento #app
createApp(App).mount('#app')
