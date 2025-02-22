<!--
  App.vue
  
  Componente raiz da aplicação.
  Este é o ponto de entrada principal do aplicativo, que:
  - Define a estrutura básica da página
  - Importa e utiliza o componente GridProdutos
  - Aplica os estilos globais
  
  Estrutura:
  - Header: Título do catálogo
  - Main: Container do grid de produtos
  
  Estilos:
  - Container responsivo com largura máxima
  - Header com borda inferior suave
  - Fundo ligeiramente diferente do conteúdo
-->

<script setup>
  import GridProdutos from './components/LayoutResponsivo/GridProdutos.vue'
</script>

<template>
  <div class="container">
    <header>
      <h1>Catálogo de Camisetas</h1>
    </header>

    <main>
      <GridProdutos />
    </main>
  </div>
</template>

<style lang="less">
@import './assets/styles/variaveis.less';
@import './assets/styles/main.less';

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 @espacamento-base;
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
</style>
