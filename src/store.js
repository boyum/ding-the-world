import Vue from 'vue';
import VueX from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Countries from './assets/countries.json';

Vue.use(VueX);

const store = new VueX.Store({
  plugins: [createPersistedState()],
  state: {
    searchText: '',
    countries: []
  },
  mutations: {
    SET_SEARCH_TEXT(state, searchText) {
      state.searchText = searchText;
    },
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    TOGGLE_VISITED(
      state,
      { countryIndex, countryName } = { countryIndex: -1, countryName: '' }
    ) {
      const indexWasPassed = countryIndex > -1;
      const nameWasPassed = countryName && countryName.length > 0;

      state.countries = state.countries.map((country, index) => {
        let correctCountry = false;

        if (indexWasPassed) {
          correctCountry = index === countryIndex;
        } else if (nameWasPassed) {
          correctCountry = country.name === countryName;
        }

        if (!correctCountry) {
          return country;
        }

        return {
          ...country,
          isVisited: !country.isVisited
        };
      });
    }
  },
  actions: {
    fetchCountries({ state, commit }) {
      const countriesListIsEmpty = state.countries.length < 1;

      if (!countriesListIsEmpty) {
        return state.countries;
      }

      const countries = Countries.map((country, index) => ({
        index,
        name: country,
        isVisited: false
      }));

      commit('SET_COUNTRIES', countries);
    },
    setSearchText({ commit }, searchText) {
      commit('SET_SEARCH_TEXT', searchText);
    },
    toggleVisited({ commit }, countryIndex) {
      commit('TOGGLE_VISITED', countryIndex);
    }
  },
  getters: {
    visitedCountries({ countries }) {
      return countries.filter(country => country.isVisited);
    },
    filteredCountries({ countries, searchText }) {
      return countries.filter(country =>
        country.name.toLowerCase().includes(searchText.toLowerCase())
      );
    },
    filteredVisitedCountries({ countries, searchText }) {
      return countries.filter(
        country =>
          country.isVisited &&
          country.name.toLowerCase().includes(searchText.toLowerCase())
      );
    },
    searchText({ searchText }) {
      return searchText;
    }
  }
});

export default store;
