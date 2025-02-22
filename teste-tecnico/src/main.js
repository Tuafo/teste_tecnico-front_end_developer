/**
 * Arquivo principal de inicialização do Vue
 * 
 * Este arquivo é o ponto de entrada da aplicação Vue.js.
 * Ele é responsável por:
 * - Importar o Vue e criar a aplicação
 * - Configurar o Vue Router para navegação entre páginas
 * - Definir rotas para cada seção do aplicativo:
 *   * Layout Responsivo: Grid de produtos com layout adaptativo
 *   * Roteamento: Sistema de categorias com rotas dinâmicas
 *   * Menu Lateral: Demonstração de menu responsivo
 *   * Checkout: Processo de finalização de compra
 * - Configurar comportamento de scroll e transições
 * - Importar estilos globais
 * - Montar a aplicação no elemento #app
 */

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/styles/main.less'

// Importação dos componentes de página
const LayoutResponsivo = () => import('./components/LayoutResponsivo/GridProdutos.vue')
const Roteamento = () => import('./components/Roteamento/Roteamento.vue')
const MenuLateral = () => import('./components/MenuLateral/MenuLateral.vue')
const Checkout = () => import('./components/Checkout/Checkout.vue')

// Configuração das rotas
const routes = [
    {
        path: '/',
        redirect: '/layout-responsivo'
    },
    {
        path: '/layout-responsivo',
        name: 'LayoutResponsivo',
        component: LayoutResponsivo
    },
    {
        path: '/roteamento',
        component: Roteamento,
        children: [
            {
                path: '',
                name: 'TodasCategorias',
                component: Roteamento,
                meta: { categoria: 'todas' }
            },
            {
                path: 'camisetas',
                name: 'Camisetas',
                component: Roteamento,
                meta: { categoria: 'camiseta' }
            },
            {
                path: 'bermudas',
                name: 'Bermudas',
                component: Roteamento,
                meta: { categoria: 'bermuda' }
            },
            {
                path: 'bolsas',
                name: 'Bolsas',
                component: Roteamento,
                meta: { categoria: 'bolsa' }
            },
            {
                path: 'pochetes',
                name: 'Pochetes',
                component: Roteamento,
                meta: { categoria: 'pochete' }
            },
            {
                path: 'moletons',
                name: 'Moletons',
                component: Roteamento,
                meta: { categoria: 'moletom' }
            }
        ]
    },
    {
        path: '/menu-lateral',
        name: 'MenuLateral',
        component: MenuLateral
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
    }
]

// Criação do router com configurações de transição
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Criação e montagem da aplicação
const app = createApp(App)
app.use(router)
app.mount('#app')
