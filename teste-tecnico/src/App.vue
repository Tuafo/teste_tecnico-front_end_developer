<!--
  App.vue
  
  Componente raiz da aplicação.
  Este é o ponto de entrada principal do aplicativo, que:
  - Define a estrutura básica da página
  - Gerencia o roteamento principal
  - Aplica os estilos globais
  
  Estrutura:
  - Navbar: Barra de navegação superior com logo e links
  - Header: Título do catálogo
  - Main: Container do grid de produtos
  
  Estilos:
  - Container responsivo com largura máxima
  - Header com borda inferior suave
  - Fundo ligeiramente diferente do conteúdo
-->

<script setup>
import Navbar from './components/Base/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="less">
@import './assets/styles/variaveis.less';
@import './assets/styles/main.less';

.container {
  max-width: @largura-maxima;
  margin: 0 auto;
  padding: 0 @espacamento-base;

  @media (max-width: @mobile) {
    margin-top: 76px;
  }
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: lighten(@cor-fundo, 2%);
}

header {
  text-align: center;
  padding: @espacamento-base * 2;
  background: @cor-fundo;
  border-bottom: 1px solid lighten(@cor-secundaria, 30%);
  margin-bottom: @espacamento-base * 2;

  h1 {
    color: @cor-primaria;
    font-size: 2em;
    margin: 0;
    font-weight: 700;
  }
}

main {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Animação de transição entre rotas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
