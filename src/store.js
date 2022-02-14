import MapImg from './assets/world.svg';
import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';

export const store = createStore({
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
      const indexWasPassedAndWithinRange =
        countryIndex > -1 && state.countries.length > countryIndex;
      const nameWasPassed = countryName && countryName.length > 0;

      let index;
      if (indexWasPassedAndWithinRange) {
        index = countryIndex;
      } else if (nameWasPassed) {
        index = state.countries.findIndex(
          (country) => country.name === countryName
        );
      }
      const country = state.countries[index];
      if (!country) {
        return;
      }
      country.isVisited = !country.isVisited;
      state.countries[index] = country;
    }
  },
  actions: {
    fetchCountries({ state, commit }) {
      const countriesListIsEmpty = state.countries.length < 1;

      if (!countriesListIsEmpty) {
        return state.countries;
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(MapImg, 'image/svg+xml');
      const paths = [...doc.getElementsByTagName('path')];
      const countryNames = paths.map((path) => path.getAttribute('data-name'));
      countryNames.sort();
      const countries = countryNames.map((country, index) => ({
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
      return countries.filter((country) => country.isVisited);
    },
    filteredCountries({ countries, searchText }) {
      return countries.filter((country) =>
        country.name.toLowerCase().includes(searchText.toLowerCase())
      );
    },
    filteredVisitedCountries({ countries, searchText }) {
      return countries.filter(
        (country) =>
          country.isVisited &&
          country.name.toLowerCase().includes(searchText.toLowerCase())
      );
    },
    searchText({ searchText }) {
      return searchText;
    }
  }
});
