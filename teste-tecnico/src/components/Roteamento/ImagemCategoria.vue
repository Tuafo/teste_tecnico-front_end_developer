<!--
  ImagemCategoria.vue
  
  Componente para exibir imagens de uma categoria específica.
  Estende o ImagemBase com configurações específicas para categorias.
  
  Props:
  - categoria: String (obrigatório)
    Identificador da categoria (ex: 'camiseta', 'bermuda')
  - numeroPasta: Number (obrigatório)
    Número da pasta de imagens dentro da categoria
  
  Funcionalidades:
  - Gera array de 4 imagens para cada item da categoria
  - Mantém aspect-ratio consistente com object-fit: cover
  - Herda funcionalidades de rotação e swipe do ImagemBase
  - Tratamento de erro para imagens não encontradas
-->

<script setup>
import ImagemBase from '../Base/ImagemBase.vue'

const props = defineProps({
    categoria: {
        type: String,
        required: true
    },
    numeroPasta: {
        type: Number,
        required: true
    }
})

// Gera o array de imagens baseado na categoria e número da pasta
const imagens = Array.from({ length: 4 }, (_, i) => {
    const numeroImagem = i + 1
    return `/images/${props.categoria}${props.numeroPasta}/${numeroImagem}.avif`
})
</script>

<template>
    <ImagemBase 
        :imagens="imagens"
        :titulo="'Imagem rotativa da categoria ' + categoria"
        class="imagem-categoria"
    />
</template>

<style lang="less" scoped>
.imagem-categoria {
    :deep(img) {
        object-fit: cover;
    }
}
</style> 