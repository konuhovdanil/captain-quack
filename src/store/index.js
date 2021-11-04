import { createStore } from 'vuex';

import { carsModule } from "./modules/cars.module";

export default createStore({
  modules: {
    cars: carsModule
  }
});
