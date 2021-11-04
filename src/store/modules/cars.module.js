import axios from "axios";

export const carsModule = {
	state() {
		return {
			carsInStock: []
		}
	},
	getters: {
		carsInStock(state) {
			return state.carsInStock
		}
	},
	mutations: {
		setCarsInStock(state, carsInStock) {
			console.log(carsInStock, 'set')
			state.carsInStock = carsInStock
		}
	},
	actions: {
		async fetchCarsInStock({state, commit}) {
			try {
				const response = await axios.get('https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json')

				commit('setCarsInStock', response.data)
			} catch (e) {
				console.log(e)
			}
		},
		removeCarFromStock({state, commit}, payload) {
			const filteredCarsInStock = state.carsInStock.filter(car => car.id !== payload.id)

			commit('setCarsInStock', filteredCarsInStock)
		},
		addCarToStock({state, commit}, payload) {
			commit('setCarsInStock', [...state.carsInStock, payload])
		},
	},
	namespaced: true
}