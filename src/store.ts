// @ts-expect-error Vuex is missing types
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import MapImg from "./assets/world.svg?raw";

type Country = {
  index: number;
  name: string;
  isVisited: boolean;
};

type State = {
  searchText: string;
  countries: Country[];
};

type Commit = (name: string, payload: unknown) => void;

type ActionContext = {
  state: State;
  commit: Commit;
};

export const store = createStore({
  plugins: [createPersistedState()],
  state: {
    searchText: "",
    countries: [],
  },
  mutations: {
    SET_SEARCH_TEXT(state: State, searchText: string) {
      state.searchText = searchText;
    },
    SET_COUNTRIES(state: State, countries: Country[]) {
      state.countries = countries;
    },
    TOGGLE_VISITED(
      state: State,
      { countryIndex, countryName } = { countryIndex: -1, countryName: "" },
    ) {
      const indexWasPassedAndWithinRange =
        countryIndex > -1 && state.countries.length > countryIndex;
      const nameWasPassed = countryName && countryName.length > 0;

      let index = -1;
      if (indexWasPassedAndWithinRange) {
        index = countryIndex;
      } else if (nameWasPassed) {
        index = state.countries.findIndex(
          country => country.name === countryName,
        );
      }

      const country = state.countries[index];
      if (!country) {
        return;
      }

      country.isVisited = !country.isVisited;
      state.countries[index] = country;
    },
  },
  actions: {
    fetchCountries({ state, commit }: ActionContext) {
      const countriesListIsEmpty = state.countries.length < 1;

      if (!countriesListIsEmpty) {
        return state.countries;
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(MapImg, "image/svg+xml");
      const paths = [...doc.getElementsByTagName("path")];
      const countryNames = paths.map(path => path.getAttribute("data-name"));

      countryNames.sort();
      const countries = countryNames.map((country, index) => ({
        index,
        name: country,
        isVisited: false,
      }));

      commit("SET_COUNTRIES", countries);
    },
    setSearchText({ commit }: ActionContext, searchText: string) {
      commit("SET_SEARCH_TEXT", searchText);
    },
    toggleVisited({ commit }: ActionContext, countryIndex: number) {
      commit("TOGGLE_VISITED", countryIndex);
    },
  },
  getters: {
    visitedCountries({ countries }: State) {
      return countries.filter(country => country.isVisited);
    },
    filteredCountries({ countries, searchText }: State) {
      return countries.filter(country =>
        country.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    },
    filteredVisitedCountries({ countries, searchText }: State) {
      return countries.filter(
        country =>
          country.isVisited &&
          country.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    },
    searchText({ searchText }: State) {
      return searchText;
    },
  },
});
