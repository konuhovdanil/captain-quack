<template>
  <button class="custom-button" :class="{'custom-button_disabled': disabled}" :disabled="disabled">
    {{ btnText }} <img src="../../assets/arrowLeft.svg" alt="arrow">
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    text: String,
    disabled: Boolean
  },
  computed: {
    btnText() {
      return this.text.toUpperCase()
    }
  }
}
</script>

<style scoped lang="scss">
.custom-button {
  width: 100%;
  height: 40px;
  background: #C3002F;
  border-radius: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: #FFFFFF;
  border: none;
  gap: 20px;
  cursor: pointer;

  &_disabled {
    pointer-events: none;
    opacity: 0.7;
  }
}
</style>