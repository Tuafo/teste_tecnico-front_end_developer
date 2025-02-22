<!--
  Checkout.vue
  
  Componente para demonstrar um processo de checkout.
  Esta é a quarta página do teste técnico.
-->

<script setup>
// Componente será implementado conforme especificações
</script>

<template>
  <div class="checkout">
    <header>
      <h1>Checkout</h1>
    </header>
    <main>
      <p>Esta página demonstrará o processo de checkout</p>
    </main>
  </div>
</template>

<style lang="less" scoped>
@import '../../assets/styles/variaveis.less';

.checkout {
  padding-top: @espacamento-duplo;
  
  header {
    text-align: center;
    margin-bottom: @espacamento-duplo;
    
    h1 {
      font-size: 2em;
      color: @cor-primaria;
    }
  }
  
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: @espacamento-duplo;
    background: @cor-fundo;
    border-radius: @raio-borda;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    p {
      font-size: 1.1em;
      line-height: 1.6;
      color: @cor-secundaria;
    }
  }
}</style> 