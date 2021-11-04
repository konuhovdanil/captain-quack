<template>
  <div class="custom-select" @click="isShowOptions = !isShowOptions">
    <div class="custom-select__placeholder">
      {{ currentPlaceholder }}
    </div>
    <div class="custom-select__container" v-if="isShowOptions">
      <div
          v-for="option in options"
          class="custom-select__container__item"
          @click="$emit('update:modelValue', option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: [],
      required: true
    }
  },
  data() {
    return {
      isShowOptions: false
    }
  },
  computed: {
    currentPlaceholder() {
      if (this.modelValue?.value !== null) {
        return this.modelValue.name;
      }

      return this.placeholder;
    },
  }
}
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  background: #FFFFFF;
  height: 40px;
  width: 100%;
  padding: 10px;
  -webkit-appearance: none;
  cursor: pointer;

  &::before {
    position: absolute;
    content: '';
    transform: translateY(-50%);
    right: 20px;
    top: 50%;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #000;
  }

  &__placeholder,
  &__container__item {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #8B8B8B;
  }

  &__container {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    width: 100%;
    border: 1px solid #DADADA;
    padding: 7px 5px 12px;
    z-index: 10;
    background: #fff;

    &__item {
      background: #FFFFFF;
      height: 32px;
      width: 100%;
      padding: 10px;
      -webkit-appearance: none;

      &:hover {
        color: #282D30;
      }
    }
  }
}
</style>