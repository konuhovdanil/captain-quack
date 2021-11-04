<template>
  <div class="app">
    <app-header/>

    <div class="app__container">
      <add-car-form/>
      <cars-in-stock :carsInStock="carsInStock" />
    </div>

    <app-footer/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import AppHeader from '@/components/AppHeader';
import AddCarForm from '@/components/AddCarForm';
import CarsInStock from "@/components/CarsInStock";
import AppFooter from "./components/AppFooter";

export default {
  name: 'App',
  components: {
    AppHeader,
    AddCarForm,
    CarsInStock,
    AppFooter
  },
  async mounted() {
    await this.fetchCarsInStock()
  },
  computed: {
    ...mapState({
      carsInStock: state => state.cars.carsInStock,
    }),
  },
  methods: {
    ...mapActions({
      fetchCarsInStock: 'cars/fetchCarsInStock'
    })
  },
}
</script>

<style lang="scss">
@font-face {
  font-family: Roboto;
  src: url('./fonts/Roboto-Regular.ttf') format('ttf');
}

* {
  font-family: Roboto, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

.app {
  overflow: hidden;
}

.app__container {
  max-width: 958px;
  margin: 0 auto;
  
  @media (max-width: 720px) {
    max-width: 700px;
  }

  @media (max-width: 360px) {
    max-width: 340px;
  }
}
</style>
