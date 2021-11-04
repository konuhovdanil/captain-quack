<template>
  <div class="custom-input">
    <div v-if="isInputPlaceholderOutside" class="custom-input__placeholder">
      {{ placeholder }}
    </div>
    <div class="custom-input__container">
      <input
        v-model="innerValue"
        ref="customInput"
        class="custom-input__container__field"
        :type="type"
        :placeholder="placeholder"
        :class="classes"
        @input="changeValue"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    placeholder: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    classes: [String, Array, Object],
    modelValue: [String, Number],
    isCurrency: Boolean,
  },
  data() {
    return {
      innerValue: ''
    }
  },
  watch: {
    modelValue(val, oldVal) {
      if (val !== oldVal && val === '') {
        this.innerValue = ''
      }
    },
  },
  computed: {
    isInputPlaceholderOutside() {
      return this.modelValue.toString().length > 0;
    }
  },
  methods: {
    changeValue() {

      if (this.isCurrency) {
        const valueWithoutSpaces = Number(this.innerValue.replace(/\s/g, ''))

        if (isNaN(valueWithoutSpaces)) {
          this.innerValue = '';
          return;
        }

        if (valueWithoutSpaces.toString().length && valueWithoutSpaces === 0) {
          this.innerValue = '';
          this.$emit('update:modelValue', '');
          return;
        }

        this.innerValue = this.formatCurrency(valueWithoutSpaces);


        this.$emit('update:modelValue', valueWithoutSpaces);
        return;
      }

      this.$emit('update:modelValue', this.innerValue);
    },
    formatCurrency(currency) {
      const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'decimal',
        currency: 'RUB',
      });

      return formatter.format(currency)
    }
  }
}
</script>

<style scoped lang="scss">
.custom-input {
  width: 100%;
  position: relative;

  &__placeholder {
    position: absolute;
    left: 10px;
    bottom: calc(100% + 5px);
  }

  &__placeholder,
  &__container__field {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #8B8B8B;
  }

  &__container__field {
    background: #FFFFFF;
    height: 40px;
    width: 100%;
    padding: 10px;
    -webkit-appearance: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>