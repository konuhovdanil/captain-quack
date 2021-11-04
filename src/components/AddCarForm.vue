<template>
  <div class="add-car-form">
    <div class="add-car-form__title">
      {{ title }}
    </div>
    <div class="add-car-form__form">
      <div class="add-car-form__form__row">
        <custom-input
          v-model="formName"
          placeholder="Название"
          class="add-car-form__form__row__item"
          :classes="setFieldClasses(formName)"
        />
        <custom-input
            v-model="formYear"
            type="number"
            placeholder="Год"
            class="add-car-form__form__row__item"
            :classes="setFieldClasses(formYear)"
        />
        <custom-input
            v-model="formPrice"
            is-currency
            placeholder="Цена"
            class="add-car-form__form__row__item"
            :classes="setFieldClasses(formPrice)"
        />
      </div>
      <div class="add-car-form__form__row">
        <custom-input
            v-model="formDescription"
            placeholder="Описание"
            :classes="setFieldClasses(formDescription)"
        />
      </div>
      <div class="add-car-form__form__row">
        <color-selector
          v-model="selectedColor"
          class="add-car-form__form__row__item"
          :colors="colors"
        />
        <custom-select
            v-model="selectedOption"
            placeholder="Статус"
            class="add-car-form__form__row__item"
            :class="['add-car-form__form__row__field', { 'add-car-form__form__row__field_filled': selectedOption.value !== null }]"
            :options="options"
        />
        <custom-button text="отправить" class="add-car-form__form__row__item" :disabled="hasInvalidValues" @click="addCar"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

import ColorSelector from "@/components/ColorSelector";

export default {
  name: "AddCarForm",
  components: {
    ColorSelector
  },
  props: {
    title: {
      type: String,
      default : '¡Ay caramba!'
    }
  },
  data() {
    return {
      formName: '',
      formYear: '',
      formPrice: '',
      formDescription: '',
      colors: [
        '#FFFFFF',
        '#000000',
        '#C4C4C4',
        '#DD1C10',
        '#77CF61'
      ],
      selectedColor: '',
      options: [
        {name: 'В наличии', value: 'in_stock'},
        {name: 'Ожидается', value: 'pednding'},
        {name: 'Нет в наличии', value: 'out_of_stock'}
      ],
      selectedOption: {
        name: null,
        value: null
      }
    }
  },
  computed: {
    hasInvalidValues() {
      return [this.formName,
        this.formYear,
        this.formPrice,
        this.selectedColor,
        this.selectedOption.value
      ].some(value => value === null || value.toString().length === 0)
    }
  },
  methods: {
    ...mapActions({
      addCarToStock: 'cars/addCarToStock'
    }),
    addCar() {
      const payload = {
        id: Date.now(),
        title: this.formName,
        year: this.formYear,
        price: this.formPrice,
        description: this.formDescription,
        color: this.selectedColor,
        status: this.selectedOption.value,
      }

      console.log(payload)

      this.addCarToStock(payload)

      this.formName = ''
      this.formYear = ''
      this.formPrice = ''
      this.formDescription = ''
      this.selectedColor = ''
      this.selectedOption = {
        name: null,
        value: null
      }
      },
    setFieldClasses(value) {
      return [
          'add-car-form__form__row__field',
        { 'add-car-form__form__row__field_filled': value && value.toString().length > 0 }
      ];
    }
  }
}
</script>

<style lang="scss">
.add-car-form {
  margin-bottom: 134px;
  
  @media (max-width: 720px) {
    margin-bottom: 60px;
  }

  @media (max-width: 720px) {
    margin-bottom: 64px;
  }

  &__title {
    font-style: normal;
    font-weight: bold;
    font-size: 42px;
    text-align: center;
    color: #282D30;
    letter-spacing: -1.4px;
    margin-bottom: 58px;

    @media (max-width: 720px) {
      margin-bottom: 40px;
    }
  }

  &__form {

    &__row {
      display: flex;
      flex-direction: row;
      gap: 20px;
      margin-bottom: 30px;

      @media (max-width: 360px) {
        flex-wrap: wrap;
        row-gap: 35px;

        &:first-child > &__item {
          &:nth-child(1) {
            flex-basis: 100%;
            order: 1;
          }
          &:nth-child(2) {
            flex-basis: 47%;
            order: 3;
          }
          &:nth-child(3) {
            flex-basis: 47%;
            order: 2;
          }
        }

        &:last-child > &__item {
          &:nth-child(1) {
            flex-basis: 100%;
            order: 1;
          }
          &:nth-child(2) {
            flex-basis: 47%;
            order: 2;
          }
          &:nth-child(3) {
            flex-basis: 47%;
            order: 3;
          }
        }
      }

      &__field {
        border: 1px solid #DADADA;
        border-bottom: 2px solid #DADADA;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        color: #8B8B8B;

        &:hover:not(&_filled) {
          border-bottom: 2px solid #C3002F;
          cursor: pointer;
        }

        &_filled {
          cursor: auto;
          border-bottom: 2px solid #282D30;
        }
      }
    }
  }
}
</style>