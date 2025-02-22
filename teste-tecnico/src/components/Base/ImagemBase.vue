<!--
  ImagemBase.vue
  
  Componente base para exibição de imagens com funcionalidades de:
  - Rotação automática no desktop
  - Swipe em dispositivos móveis
  - Indicadores de progresso
  - Tratamento de erros
  - Pré-carregamento de imagens
-->

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

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

// Estado do componente
const indiceImagemAtual = ref(0)
const touchStart = ref(null)
const touchEnd = ref(null)
const rotacaoAtiva = ref(false)
const intervaloRotacao = ref(null)
const ehMobile = ref(false)
const imagensCarregadas = ref(new Set())
const todasImagensCarregadas = ref(false)

// Computed property para a imagem atual
const imagemAtual = computed(() => props.imagens[indiceImagemAtual.value])

// Pré-carrega todas as imagens
const preCarregarImagens = () => {
    props.imagens.forEach(src => {
        const img = new Image()
        img.onload = () => {
            imagensCarregadas.value.add(src)
            if (imagensCarregadas.value.size === props.imagens.length) {
                todasImagensCarregadas.value = true
            }
        }
        img.onerror = handleImageError
        img.src = src
    })
}

// Função para verificar se uma imagem existe
const handleImageError = (e) => {
    console.error(`Erro ao carregar imagem: ${e.target.src}`)
    e.target.src = '/images/logo_chico_rei.png' // Imagem de fallback
}

// Atualiza o índice da imagem atual
const atualizarImagem = (novoIndice) => {
    // Só permite a mudança se a próxima imagem já estiver carregada
    const proximaImagem = props.imagens[novoIndice]
    if (imagensCarregadas.value.has(proximaImagem)) {
        indiceImagemAtual.value = novoIndice >= 0 && novoIndice < props.imagens.length 
            ? novoIndice 
            : 0
    }
}

// Verifica se o dispositivo é mobile
const verificarMobile = () => {
    ehMobile.value = window.innerWidth <= 768
}

// Inicia a rotação automática das imagens (apenas desktop)
const iniciarRotacao = () => {
    if (ehMobile.value || !todasImagensCarregadas.value) return
    
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
    if (ehMobile.value) return
    
    rotacaoAtiva.value = false
    if (intervaloRotacao.value) {
        clearInterval(intervaloRotacao.value)
        intervaloRotacao.value = null
    }
}

// Handlers para eventos de touch
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

// Watch para mudanças nas props.imagens
watch(() => props.imagens, () => {
    imagensCarregadas.value = new Set()
    todasImagensCarregadas.value = false
    preCarregarImagens()
}, { immediate: true })

// Configura os listeners de eventos ao montar o componente
onMounted(() => {
    verificarMobile()
    window.addEventListener('resize', verificarMobile)
    preCarregarImagens()
})

// Remove os listeners e limpa o intervalo ao desmontar o componente
onUnmounted(() => {
    window.removeEventListener('resize', verificarMobile)
    pararRotacao()
})
</script>

<template>
    <div class="imagem-base"
         role="img"
         :aria-label="titulo"
         @mouseenter="iniciarRotacao"
         @mouseleave="pararRotacao"
         @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd">
        <img :src="imagemAtual" 
             :alt="titulo"
             loading="lazy"
             draggable="false"
             @error="handleImageError">
        
        <div class="indicadores-progresso"
             v-show="ehMobile || rotacaoAtiva">
            <span v-for="(_, index) in imagens" 
                  :key="index"
                  :class="{ 
                      'ativo': index === indiceImagemAtual,
                      'carregado': imagensCarregadas.has(imagens[index])
                  }"
                  class="indicador"
                  @click="selecionarImagem(index)"></span>
        </div>

        <!-- Loader enquanto as imagens carregam -->
        <div v-if="!todasImagensCarregadas" class="loader">
            <span class="loader-texto">Carregando imagens...</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '../../assets/styles/variaveis.less';

.imagem-base {
    width: @largura-imagem;
    height: @altura-card;
    position: relative;
    .centralizar-flex();
    flex-shrink: 0;
    background: @cor-fundo;
    border-radius: @raio-borda;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        .transicao-suave();
        user-select: none;
        -webkit-user-drag: none;
    }

    .indicadores-progresso {
        position: absolute;
        bottom: @espacamento-base;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: @espacamento-base;
        padding: @espacamento-metade;
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        .transicao-suave();
        
        .indicador {
            .indicador-base();
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.4);
            
            &.carregado {
                background: rgba(255, 255, 255, 0.5);
                border-color: rgba(255, 255, 255, 0.6);
            }
            
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

    .loader {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;

        .loader-texto {
            color: @cor-primaria;
            font-size: 0.9em;
        }
    }

    @media (max-width: @tablet) {
        width: 100%;
        height: auto;
        aspect-ratio: 3/4;
        
        .indicadores-progresso {
            opacity: 1;
            pointer-events: auto;
        }
    }

    @media (max-width: @mobile) {
        width: @largura-imagem-mobile;
        height: @altura-card-mobile;
        
        .indicadores-progresso {
            bottom: @espacamento-metade;
            gap: @espacamento-metade;
        }
    }
}
</style> 