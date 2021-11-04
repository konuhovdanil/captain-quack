<template>
  <div class="cars-in-stock">
    <div class="cars-in-stock__title">АВТОМОБИЛИ В НАЛИЧИИ</div>

    <div class="cars-in-stock__table">
      <div class="cars-in-stock__table__head">
        <div class="cars-in-stock__table__head__column">Название</div>
        <div class="cars-in-stock__table__head__column">Год</div>
        <div class="cars-in-stock__table__head__column">Цвет</div>
        <div class="cars-in-stock__table__head__column">Статус</div>
        <div class="cars-in-stock__table__head__column">Цена</div>
        <div class="cars-in-stock__table__head__column"></div>
      </div>
      <div class="cars-in-stock__table__body">
        <div class="cars-in-stock__table__body__row" v-for="car in carsInStock" :key="car.id">
          <div class="cars-in-stock__table__body__row__column cars-in-stock__table__body__row__column_title">
            <div class="cars-in-stock__table__body__row__column__content">
              <div class="cars-in-stock__table__body__row__column__content__title">
                {{ car.title }}
              </div>
              <div class="cars-in-stock__table__body__row__column__content__description" v-if="car.description">
                {{ car.description }}
              </div>
            </div>
          </div>

          <div class="cars-in-stock__table__body__row__column cars-in-stock__table__body__row__column_mobile cars-in-stock__table__body__row__column_description">
            <div class="cars-in-stock__table__body__row__column__content">
              <div class="cars-in-stock__table__body__row__column__content__description" v-if="car.description">
                {{ car.description }}
              </div>
            </div>
          </div>

          <div class="cars-in-stock__table__body__row__column cars-in-stock__table__body__row__column_year">
            <div class="cars-in-stock__table__body__row__column__content">
              {{ car.year }}
            </div>
          </div>
          <div class="cars-in-stock__table__body__row__column cars-in-stock__table__body__row__column_with_color">
            <div class="cars-in-stock__table__body__row__column__content" :style="{ 'background-color': car.color, 'border': setColorBoxBorder(car.color) }">
            </div>
          </div>
          <div class="cars-in-stock__table__body__row__column cars-in-stock__table__body__row__column_status">
            <div class="cars-in-stock__table__body__row__column__content">
              {{ getCarStatus(car.status) }}
            </div>
          </div>
          <div class="cars-in-stock__table__body__row__column cars-in-stock__table__body__row__column_price">
            <div class="cars-in-stock__table__body__row__column__content">
              {{ formatCurrency(car.price) }} руб.
            </div>
          </div>
          <div class="cars-in-stock__table__body__row__column cars-in-stock__table__body__row__column_remove_button">
            <div class="cars-in-stock__table__body__row__column__content">
              <button class="cars-in-stock__table__body__row__column__content__button" @click="removeCarFromStock({id: car.id})">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "CarsInStockTable",
  props: {
    carsInStock: {
      type: Array,
      default: [],
      required: true
    }
  },
  methods: {
    ...mapActions({
      removeCarFromStock: 'cars/removeCarFromStock'
    }),
    getCarStatus(status) {
      const statuses = [
        {name: 'В наличии', value: 'in_stock'},
        {name: 'Ожидается', value: 'pednding'},
        {name: 'Нет в наличии', value: 'out_of_stock'}
      ]

      return statuses.find(item => item.value === status).name
    },
    setColorBoxBorder(color) {
      const colorInLowerCase = color.toLowerCase()

      if (colorInLowerCase === '#ffffff' || colorInLowerCase === 'white') {
        return '1px solid #8B8B8B'
      }

      return 'none'
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
.cars-in-stock {
  margin-bottom: 268px;

  @media (max-width: 720px) {
    margin-bottom: 318px;
  }

  @media (max-width: 360px) {
    margin-bottom: 0;
  }

  &__title {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #282D30;
    padding-left: 15px;
    position: relative;
    margin-bottom: 31px;
    letter-spacing: -0.6px;

    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 18px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: #8B8B8B;
    }
  }

  &__table {

    &__head {
      background: #C3002F;
      border-radius: 4px 4px 0 0;
      flex-direction: row;
      padding: 14px 15px;
      display: grid;
      justify-content: space-between;
      align-items: center;
      grid-template-columns: 50% 6% 7% 13% 14% 10%;

      @media (max-width: 720px) {
        grid-template-columns: 40% 7% 7% 18% 16% 12%;
      }

      @media (max-width: 360px) {
        display: none;
      }

      &__column {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: #FFFFFF;

        &:not(:first-child) {
          padding-left: 5px;
        }
      }
    }

    &__body {

      &__row {
        background: #F5F6F6;
        min-height: 52px;
        padding: 15px;
        display: grid;
        justify-content: space-between;
        align-items: center;
        grid-template-columns: 50% 6% 7% 13% 14% 10%;

        @media (max-width: 720px) {
          grid-template-columns: 40% 7% 7% 18% 16% 12%;
        }

        @media (max-width: 360px) {
          padding: 16px 10px;
          grid-template-columns: 13% 37% 15% 35%;
          grid-template-areas:
            'column-title column-title column-with-color column-price'
            'column-description column-description column-description column-description'
            'column-year column-status . column-remove-button';
          position: relative;

          &::before,
          &::after {
            position: absolute;
            content: '';
            background: #F5F6F6;
            top: 0;
            height: 100%;
            width: calc(100vw - 100%);
          }

          &::before {
            right: 100%;
          }
          &::after {
            left: 100%;
          }
        }

        &:not(:first-child) {
          border-top: 1px solid #DADADA;
        }

        &__column {
          height: 100%;

          @media (max-width: 360px) {
            &_title{
              grid-area: column-title;
              grid-column-start: 1;
              grid-column-end: 3;
            }
            &_description{
              grid-area: column-description;
            }
            &_year{
              grid-area: column-year;
            }
            &_with_color{
              grid-area: column-with-color;
            }
            &_status{
              grid-area: column-status;
            }
            &_price{
              grid-area: column-price;
              text-align: right;
            }
            &_remove_button{
              grid-area: column-remove-button;
            }
          }

          &_mobile {
            display: none;
          }

          &:not(:first-child) {
            .cars-in-stock__table__body__row__column__content {
              padding-left: 5px;

              @media (max-width: 720px) {
                padding-left: 4px;
              }
            }
          }
          
          &.cars-in-stock__table__body__row__column_with_color {
              .cars-in-stock__table__body__row__column__content {
                margin-left: 15px;
                width: 19px;
                height: 19px;
                border-radius: 50%;

                @media (max-width: 360px) {
                  margin-left: 25px;
                }
              }
          }

          @media (max-width: 360px) {
            &:not(&_mobile) {
              .cars-in-stock__table__body__row__column__content__description {
                display: none;
              }
            }

            &_mobile {
              display: block;
              padding-bottom: 21px;
            }
          }

          &__content {
            font-style: normal;
            font-weight: 300;
            font-size: 15px;
            color: #323232;
            line-height: 18px;

            @media (max-width: 720px) {
              line-height: 16px;
            }

            @media (max-width: 360px) {
              line-height: 20px;
            }

            &__description {
              font-style: normal;
              font-weight: 300;
              font-size: 13px;
              color: #8B8B8B;
              padding-top: 8px;

              @media (max-width: 360px) {
                line-height: 16px;
              }
            }

            &__button {
              cursor: pointer;
              border: none;
              padding: 4px 15px;
              background: transparent;

              @media (max-width: 360px) {
                background: #282D30;
                border-radius: 20px;
                color: #FFFFFF;
                margin-left: auto;
                display: block;
              }

              &:hover {
                background: #282D30;
                border-radius: 20px;
                color: #FFFFFF;
              }
            }
          }
        }
      }
    }
  }
}
</style>