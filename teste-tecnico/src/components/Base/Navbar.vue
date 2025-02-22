<!--
  Navbar.vue
  
  Componente de navegação principal da aplicação.
  Responsabilidades:
  - Exibir o logo da aplicação
  - Prover navegação entre as diferentes seções
  - Manter consistência visual em diferentes resoluções
-->

<script setup>
// Componente não requer props ou lógica adicional
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <img src="/images/logo_chico_rei.png" alt="Logo Chico Rei">
      </div>
      <div class="nav-content">
        <div class="nav-links">
          <router-link to="/layout-responsivo" class="nav-link">LAYOUT RESPONSIVO</router-link>
          <router-link to="/roteamento" class="nav-link">ROTEAMENTO</router-link>
          <router-link to="/menu-lateral" class="nav-link">MENU LATERAL</router-link>
          <router-link to="/checkout" class="nav-link">CHECKOUT</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>
@import '../../assets/styles/variaveis.less';

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: @cor-navbar;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  .navbar-container {
    max-width: @largura-maxima;
    margin: 0 auto;
    padding: 0 @espacamento-base;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      height: 40px;
      display: flex;
      align-items: center;

      img {
        height: 100%;
        width: auto;
        object-fit: contain;
      }
    }

    .nav-content {
      display: flex;
      align-items: center;
      gap: @espacamento-duplo;

      .nav-links {
        display: flex;
        gap: @espacamento-duplo;

        .nav-link {
          color: @cor-link;
          text-decoration: none;
          font-weight: 500;
          font-size: 1em;
          padding: @espacamento-base * 0.3 @espacamento-base;
          border-radius: @raio-borda;
          transition: background-color 0.2s ease, color 0.2s ease;
          outline: none;
          display: inline-block;
          text-align: center;

          &:hover {
            color: @cor-link-hover;
            background: rgba(0, 0, 0, 0.05);
          }

          &:focus-visible {
            box-shadow: 0 0 0 2px rgba(255, 153, 53, 0.3);
          }

          &.router-link-active {
            color: #4D4C4B;
            background: rgba(255, 153, 53, 0.2);
          }
        }
      }
    }
  }

  @media (max-width: @mobile) {
    height: 56px;

    .navbar-container {
      .logo {
        height: 32px;
      }

      .nav-content {
        gap: @espacamento-base;

        .nav-links {
          gap: @espacamento-base;
          
          .nav-link {
            font-size: 0.9em;
            padding: @espacamento-metade @espacamento-base;
          }
        }
      }
    }
  }
}
</style> 