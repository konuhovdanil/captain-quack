<template>
  <div class="color-selector">
    <div class="color-selector__title">
      Цвет
    </div>
    <div class="color-selector__container">
      <div
          v-for="color in colors"
          class="color-selector__container__item"
          :class="{'color-selector__container__item_selected': selectedColor === color, 'color-selector__container__item_light_color': color.toLowerCase() === '#ffffff'}"
          :style="{'background-color': color}"
          @click="setColor(color)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorSelector",
  props: {
    modelValue: String,
    colors: {
      type: Array,
      default: [],
      required: true
    }
  },
  data() {
    return {
      selectedColor: null
    }
  },
  methods: {
    setColor(color) {
      this.selectedColor = color
      this.$emit('update:modelValue', color)
    }
  }
}
</script>

<style scoped lang="scss">
.color-selector {
  width: 100%;
  padding-top: 13px;

  &__title {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #8B8B8B;
    margin-bottom: 12px;
  }

  &__container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 24px;

    &__item {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      cursor: pointer;

      &_light_color {
        border: 1px solid #8B8B8B;
      }

      &_selected {
        position: relative;

        &::before {
          content: '';
          background: transparent;
          position: absolute;
          width: 16px;
          height: 16px;
          border: 3px solid #C3002F;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>