<!--
  GridProdutos.vue
  
  Este é o componente principal do catálogo, responsável por:
  - Gerar os dados dos produtos usando faker-js
  - Organizar os cards em um grid responsivo
  - Gerenciar estados de carregamento e erro
  
  Funcionalidades:
  - Gera X produtos com dados aleatórios, a quantidade é definida em categorias na função gerarProdutos.
  - As imagens são pegas da pasta 'images' a categoria é o nome da pasta.
  - Adapta o layout para diferentes tamanhos de tela:
    * Desktop: 3 colunas
    * Tablet: 2 colunas
    * Mobile: 2 colunas
  - Exibe mensagens de carregamento e erro quando necessário
-->

<script setup>
import { ref, onMounted } from 'vue'
import { fakerPT_BR as faker } from '@faker-js/faker'
import CardProduto from './CardProduto.vue'

// Referências para os cards e estados do componente
const cardRefs = ref([])
const isLoading = ref(true)
const error = ref(null)

// Formata o preço para o formato brasileiro (R$)
const formatarPreco = (valor) => {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

// Gera os dados dos produtos usando faker-js
const gerarProdutos = () => {
    try {
        isLoading.value = true
        
        // Define todas as categorias e suas quantidades
        const categorias = [
            { nome: 'camiseta', quantidade: 4 },
            { nome: 'bermuda', quantidade: 3 },
            { nome: 'bolsa', quantidade: 2 },
            { nome: 'pochete', quantidade: 2 },
            { nome: 'moletom', quantidade: 1 }
        ]

        // Gera um array com todos os produtos possíveis
        const produtos = []
        
        categorias.forEach(categoria => {
            for (let i = 1; i <= categoria.quantidade; i++) {
                // Gera um preço aleatório entre 29,90 e 99,90
                const preco = faker.number.float({ 
                    min: 29.90, 
                    max: 99.90, 
                    precision: 0.01 
                })
                
                // Gera o array com os caminhos das 4 imagens do produto
                const imagens = Array.from({ length: 4 }, (_, j) => {
                    const numeroImagem = j + 1
                    return `/images/${categoria.nome}${i}/${numeroImagem}.avif`
                })
                
                // Gera o título baseado na categoria
                const adjetivo = faker.commerce.productAdjective()
                const titulo = categoria.nome === 'camiseta' ? `Camiseta ${adjetivo}` :
                             categoria.nome === 'bermuda' ? `Bermuda ${adjetivo}` :
                             categoria.nome === 'bolsa' ? `Bolsa ${adjetivo}` :
                             `Pochete ${adjetivo}`

                // Adiciona o produto ao array
                produtos.push({
                    id: faker.string.uuid(),
                    titulo,
                    descricao: faker.lorem.paragraph(),
                    preco: formatarPreco(preco),
                    imagemPrincipal: imagens[0],
                    imagens
                })
            }
        })

        // Embaralha o array de produtos para exibição aleatória
        return faker.helpers.shuffle(produtos)
    } catch (e) {
        error.value = 'Erro ao carregar produtos'
        console.error('Erro ao gerar produtos:', e)
        return []
    } finally {
        isLoading.value = false
    }
}

// Inicializa o array de produtos
const produtos = ref(gerarProdutos())

// Configura as referências dos cards quando o componente é montado
onMounted(() => {
    cardRefs.value = new Array(produtos.value.length).fill(null)
})
</script>

<template>
    <section class="grid-produtos" 
             role="main" 
             aria-label="Catálogo de Produtos">
        <div v-if="isLoading" class="loading" role="status">
            <span>Carregando produtos...</span>
        </div>
        <div v-else-if="error" class="error" role="alert">
            {{ error }}
        </div>
        <template v-else>
            <CardProduto
                v-for="(produto, index) in produtos"
                :key="produto.id"
                :ref="el => cardRefs[index] = el"
                :produto="produto"
            />
        </template>
    </section>
</template>

<style lang="less" scoped>
@import '../../assets/styles/variaveis.less';
@import '../../assets/styles/responsivo.less';

.grid-produtos {
    .grid-base();
    max-width: @largura-maxima;
    grid-template-columns: repeat(3, @largura-card);
    gap: @espacamento-duplo;
    padding: @espacamento-duplo max(1.8vw, @espacamento-base);
    margin: 0 auto;

    @media (max-width: 1550px) {
        grid-template-columns: repeat(2, @largura-card);
        gap: @espacamento-duplo;
        padding: @espacamento-base max(1.8vw, @espacamento-base * 1.5);
    }

    @media (max-width: @mobile) {
        grid-template-columns: repeat(2, @largura-card-mobile);
        gap: max(1.5vw, @espacamento-base * 0.4);
        padding: @espacamento-base max(1.8vw, @espacamento-base * 0.75);
        justify-content: center;
    }

    @media (min-width: @mobile) and (max-width: @tablet) {
        grid-template-columns: repeat(2, @largura-card-tablet);
        gap: max(1.5vw, @espacamento-base);
        padding: @espacamento-base max(1.8vw, @espacamento-base * 1.5);
    }
}

.loading, .error {
    .erro();
}
</style>
