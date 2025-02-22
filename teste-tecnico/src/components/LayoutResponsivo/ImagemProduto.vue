<!--
  ImagemProduto.vue
  
  Componente para exibir imagens de produtos.
  Estende o ImagemBase com configurações específicas para produtos.
-->

<script setup>
import ImagemBase from '../Base/ImagemBase.vue'

const props = defineProps({
    imagens: {
        type: Array,
        required: true
    },
    titulo: {
        type: String,
        required: true
    }
})
</script>

<template>
    <ImagemBase 
        :imagens="imagens"
        :titulo="'Imagem rotativa da ' + titulo"
        class="imagem-produto"
    />
</template>

<style lang="less" scoped>
.imagem-produto {
    :deep(img) {
        object-fit: contain;
    }
}
</style> 