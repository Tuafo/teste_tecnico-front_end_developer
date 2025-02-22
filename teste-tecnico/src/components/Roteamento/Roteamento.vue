<!--
  Roteamento.vue
  
  Componente para demonstrar o funcionamento do Vue Router.
  Agora utiliza o GridCategoria para exibir o conteúdo.
-->

<script setup>
import GridCategoria from './GridCategoria.vue'
</script>

<template>
    <div class="roteamento">
        <GridCategoria />
    </div>
</template>

<style lang="less" scoped>
.roteamento {
    width: 100%;
}
</style> 