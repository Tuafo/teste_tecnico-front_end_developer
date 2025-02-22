<!--
  CardProduto.vue
  
  Este componente representa um card de produto individual no catálogo.
  Ele é responsável por exibir a imagem do produto, título, descrição e preço.
  
  Props:
  - produto: Object (obrigatório)
    Objeto contendo as informações do produto:
    - imagens: Array de strings com URLs das imagens
    - titulo: String com o nome do produto
    - descricao: String com a descrição do produto
    - preco: String com o preço formatado
  
  Funcionalidades:
  - Rotação automática de imagens ao passar o mouse (desktop)
  - Swipe de imagens em dispositivos touch
  - Layout responsivo para diferentes tamanhos de tela
-->

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ImagemProduto from './ImagemProduto.vue'
import ConteudoProduto from './ConteudoProduto.vue'

// Recebe as propriedades do produto
const props = defineProps({
    produto: {
        type: Object,
        required: true
    }
})

// Estado do componente
const ehMobile = ref(false)          // Controla se está em visualização mobile
const estaRotacionando = ref(false)  // Controla a rotação automática das imagens

// Verifica se o dispositivo é mobile baseado na largura da tela
const verificarMobile = () => {
    ehMobile.value = window.innerWidth <= 768
}

// Configura os listeners de eventos ao montar o componente
onMounted(() => {
    verificarMobile()
    window.addEventListener('resize', verificarMobile)
})

// Remove os listeners ao desmontar o componente
onUnmounted(() => {
    window.removeEventListener('resize', verificarMobile)
})
</script>

<template>
    <div class="card-produto">
        <ImagemProduto 
            :imagens="produto.imagens"
            :titulo="produto.titulo"
            :esta-rotacionando="estaRotacionando"
            :eh-mobile="ehMobile"
        />
        <ConteudoProduto 
            :titulo="produto.titulo"
            :descricao="produto.descricao"
            :preco="produto.preco"
        />
    </div>
</template>

<style lang="less" scoped>
@import '../../assets/styles/variaveis.less';
@import '../../assets/styles/responsivo.less';

.card-produto {
    display: flex;
    flex-direction: row;
    width: @largura-card;
    background: transparent;
    overflow: hidden;

    @media (max-width: @tablet) {
        width: 100%;
        flex-direction: column;
    }

    @media (max-width: @mobile) {
        width: 100%;
        flex-direction: column;
        font-size: 0.9em;
        max-width: @largura-card-mobile;
    }
}
</style>


