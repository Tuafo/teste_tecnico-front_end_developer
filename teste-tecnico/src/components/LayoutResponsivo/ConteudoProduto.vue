<!--
  ConteudoProduto.vue
  
  Este componente é responsável por exibir as informações textuais do produto:
  título, descrição e preço. Ele é um componente filho do CardProduto.
  
  Props:
  - titulo: String (obrigatório)
    Título/nome do produto
  - descricao: String (obrigatório)
    Descrição detalhada do produto
  - preco: String (obrigatório)
    Preço do produto já formatado em reais
  
  Características:
  - Limita o número de linhas do título e descrição
  - Adapta o tamanho do texto para diferentes telas
  - Mantém o preço sempre visível na parte inferior
-->

<script setup>
// Define as propriedades que o componente recebe
const props = defineProps({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="conteudo-produto">
        <h3 id="produto-titulo">{{ titulo }}</h3>
        <p id="produto-descricao">{{ descricao }}</p>
        <strong class="preco" 
                role="text" 
                aria-labelledby="produto-titulo"
                aria-label="Preço">{{ preco }}</strong>
    </div>
</template>

<style lang="less" scoped>
@import '../../assets/styles/variaveis.less';
@import '../../assets/styles/responsivo.less';

.conteudo-produto {
    width: @largura-conteudo;
    height: @altura-card;
    padding: 0 @espacamento-duplo @espacamento-duplo @espacamento-duplo;
    background: @cor-fundo;
    display: flex;
    flex-direction: column;

    h3 {
        .linha-clamp(2);
        margin-bottom: @espacamento-base * 1.25;
        font-size: 1.2em;
        line-height: 1.3;
        color: @cor-primaria;
        height: auto;
        min-height: 2.6em;
    }

    p {
        .linha-clamp(7);
        margin-bottom: @espacamento-base;
        font-size: 1.05em;
        line-height: 1.5;
        color: @cor-secundaria;
        min-height: 0;
        flex-grow: 1;
    }

    .preco {
        padding-top: @espacamento-base;
        font-size: 1.3em;
        color: @cor-primaria;
        font-weight: bold;
        margin-top: auto;
    }

    @media (max-width: @tablet) {
        width: 100%;
        height: auto;
        min-height: auto;
        padding: calc(@espacamento-base * 1.25);
        
        h3 {
            font-size: clamp(0.95em, 2.5vw, 1.1em);
            margin-bottom: @espacamento-base;
            min-height: auto;
            line-height: 1.3;
            .linha-clamp(2);
        }

        p {
            font-size: clamp(0.85em, 2vw, 1em);
            margin-bottom: @espacamento-base;
            line-height: 1.4;
            min-height: 0;
            .linha-clamp(3);
        }

        .preco {
            padding-top: @espacamento-base;
            font-size: clamp(1em, 2.5vw, 1.2em);
            margin-top: @espacamento-base;
        }
    }

    @media (max-width: @mobile) {
        min-height: auto;
        width: @largura-card-mobile;
        padding: calc(@espacamento-base * 0.85);

        h3 {
            font-size: clamp(0.935em, 3vw, 1em);
            margin-bottom: calc(@espacamento-base * 0.85);
            line-height: 1.3;
            .linha-clamp(2);
        }

        p {
            font-size: clamp(0.88em, 2.5vw, 0.95em);
            line-height: 1.4;
            .linha-clamp(3);
            margin-bottom: calc(@espacamento-base * 0.85);
        }

        .preco {
            font-size: clamp(1.045em, 3vw, 1.1em);
            padding-top: calc(@espacamento-base * 0.85);
        }
    }

    .responsivo-conteudo();
    .responsivo-texto();
}
</style> 