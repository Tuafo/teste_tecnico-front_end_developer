<!--
  ImagemProduto.vue
  
  Componente responsável por exibir e gerenciar as imagens do produto.
  Oferece funcionalidades diferentes para desktop e mobile:
  
  Desktop:
  - Rotação automática das imagens ao passar o mouse
  - Indicadores visuais das imagens disponíveis
  - Clique nos indicadores para trocar a imagem
  
  Mobile:
  - Suporte a gestos de swipe para trocar imagens
  - Indicadores sempre visíveis
  - Otimizado para touch
  
  Props:
  - imagens: Array (obrigatório)
    Array com URLs das imagens do produto
  - titulo: String (obrigatório)
    Nome do produto para acessibilidade
  - estaRotacionando: Boolean
    Controla se a rotação automática está ativa
  - ehMobile: Boolean
    Indica se está em visualização mobile
-->

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Define as propriedades do componente
const props = defineProps({
    imagens: {
        type: Array,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    estaRotacionando: {
        type: Boolean,
        default: false
    },
    ehMobile: {
        type: Boolean,
        default: false
    }
})

// Estado do componente
const indiceImagemAtual = ref(0)
const rotacaoAtiva = ref(false)
const intervaloRotacao = ref(null)
const touchStart = ref(null)
const touchEnd = ref(null)

// Computed property para a imagem atual
const imagemAtual = computed(() => props.imagens[indiceImagemAtual.value])

// Atualiza o índice da imagem atual
const atualizarImagem = (novoIndice) => {
    indiceImagemAtual.value = novoIndice >= 0 && novoIndice < props.imagens.length 
        ? novoIndice 
        : 0
}

// Inicia a rotação automática das imagens (apenas desktop)
const iniciarRotacao = () => {
    if (props.ehMobile) return
    
    rotacaoAtiva.value = true
    if (!intervaloRotacao.value) {
        intervaloRotacao.value = setInterval(() => {
            const proximoIndice = (indiceImagemAtual.value + 1) % props.imagens.length
            atualizarImagem(proximoIndice)
        }, 1000)
    }
}

// Para a rotação automática das imagens
const pararRotacao = () => {
    if (props.ehMobile) return
    
    rotacaoAtiva.value = false
    if (intervaloRotacao.value) {
        clearInterval(intervaloRotacao.value)
        intervaloRotacao.value = null
    }
}

// Handlers para eventos de touch (mobile)
const handleTouchStart = (e) => {
    touchStart.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
    if (!touchStart.value) return
    
    touchEnd.value = e.touches[0].clientX
    const swipeDistance = touchEnd.value - touchStart.value
    
    if (Math.abs(swipeDistance) > 10) {
        e.preventDefault()
    }
}

const handleTouchEnd = () => {
    if (!touchStart.value || !touchEnd.value) return
    
    const swipeDistance = touchEnd.value - touchStart.value
    const minSwipeDistance = 50
    
    if (Math.abs(swipeDistance) >= minSwipeDistance) {
        if (swipeDistance > 0) {
            const novoIndice = (indiceImagemAtual.value - 1 + props.imagens.length) % props.imagens.length
            atualizarImagem(novoIndice)
        } else {
            const novoIndice = (indiceImagemAtual.value + 1) % props.imagens.length
            atualizarImagem(novoIndice)
        }
    }
    
    touchStart.value = null
    touchEnd.value = null
}

// Permite selecionar uma imagem específica pelos indicadores
const selecionarImagem = (indice) => {
    if (indice !== indiceImagemAtual.value) {
        atualizarImagem(indice)
    }
}

// Limpa o intervalo de rotação quando o componente é desmontado
onUnmounted(() => {
    pararRotacao()
})
</script>

<template>
    <div class="imagem-produto"
         role="img"
         :aria-label="'Imagem rotativa da ' + titulo"
         @mouseenter="iniciarRotacao"
         @mouseleave="pararRotacao"
         @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd">
        <img :src="imagemAtual" 
             :alt="'Foto da ' + titulo"
             loading="lazy"
             draggable="false">
        
        <div class="indicadores-progresso" 
             v-show="ehMobile || rotacaoAtiva">
            <span v-for="(_, index) in imagens" 
                  :key="index"
                  :class="{ 'ativo': index === indiceImagemAtual }"
                  class="indicador"
                  @click="selecionarImagem(index)"></span>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '../../assets/styles/variaveis.less';
@import '../../assets/styles/responsivo.less';

.imagem-produto {
    width: @largura-imagem;
    height: @altura-card;
    position: relative;
    .centralizar-flex();
    flex-shrink: 0;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        .transicao-suave();
        user-select: none;
        -webkit-user-drag: none;
    }

    .indicadores-progresso {
        position: absolute;
        bottom: @espacamento-duplo;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: @espacamento-base;
        padding: @espacamento-metade;
        z-index: 1;
        opacity: 0;
        .transicao-suave();
        pointer-events: none;
        
        &:hover {
            opacity: 1;
        }
        
        .indicador {
            .indicador-base();
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.4);
            pointer-events: auto;
            
            &:hover {
                transform: scale(1.3);
                background: rgba(255, 255, 255, 0.6);
                border-color: rgba(255, 255, 255, 0.7);
            }
            
            &.ativo {
                background: white;
                border-color: white;
                transform: scale(1.3);
            }
        }
    }

    &:hover .indicadores-progresso {
        opacity: 1;
        pointer-events: auto;
    }

    @media (max-width: @tablet) {
        width: 100%;
        height: auto;
        aspect-ratio: 550/824;
        touch-action: pan-y pinch-zoom;
        
        .indicadores-progresso {
            opacity: 1;
            pointer-events: auto;
            bottom: @espacamento-base;
        }
    }

    @media (max-width: @mobile) {
        width: @largura-imagem-mobile;
        height: @altura-card-mobile;
        aspect-ratio: auto;
        
        img {
            object-fit: cover;
        }
        
        .indicadores-progresso {
            bottom: @espacamento-base;
            gap: @espacamento-metade;
            
            .indicador {
                width: 6px;
                height: 6px;
            }
        }
    }
}
</style> 