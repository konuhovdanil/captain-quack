<template>
  <header class="header">
    <div class="header__logo">
      <img src="../assets/logo.png" alt="logo" class="header__logo__image">
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style scoped lang="scss">
.header {
  position: relative;
  background: #282D30;
  text-align: center;
  margin-bottom: 60px;
  height: 104px;

  @media (max-width: 360px) {
    height: 102px;
    margin-bottom: 30px;
  }

  &::before {
    position: absolute;
    content: '';
    height: 2px;
    width: 100%;
    background: #fff;
    left: 0;
    bottom: 0;
    z-index: 3;

    @media (max-width: 360px) {
      display: none;
    }
  }

  &__logo {
    position: relative;
    z-index: 5;
    padding-top: 3px;

    @media (max-width: 360px) {
      max-width: 300px;
      margin: 0 auto;
      padding-top: 22px;
    }

    &__image {
      max-width: 100%;
    }
  }
}
</style>