import type { InjectionKey } from "vue";
import {
  createStore,
  type Store,
  type StoreOptions,
  type DispatchOptions,
} from "vuex";
import createPersistedState from "vuex-persistedstate";
import MapImg from "./assets/world.svg?raw";
import type { Country } from "./types";

type State = {
  searchText: string;
  countries: Country[];
};

export const key: InjectionKey<Store<State>> = Symbol();

const storeOptions = {
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
    TOGGLE_VISITED_BY_INDEX(state: State, countryIndex: number) {
      const validIndex =
        -1 < countryIndex && countryIndex < state.countries.length;

      if (!validIndex) {
        return;
      }

      const country = state.countries[countryIndex];
      country.isVisited = !country.isVisited;
      state.countries[countryIndex] = country;
    },

    TOGGLE_VISITED_BY_NAME(state: State, countryName: string) {
      const countryIndex = state.countries.findIndex(
        country => country.name === countryName,
      );

      const countryNotFound = countryIndex < 0;
      if (countryNotFound) {
        return;
      }

      const country = state.countries[countryIndex];

      country.isVisited = !country.isVisited;
      state.countries[countryIndex] = country;
    },
  },
  actions: {
    fetchCountries({ state, commit }) {
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
    setSearchText({ commit }, searchText: string) {
      commit("SET_SEARCH_TEXT", searchText);
    },
    toggleVisitedByName({ commit }, countryName: string) {
      commit("TOGGLE_VISITED_BY_NAME", countryName);
    },
    toggleVisitedByIndex({ commit }, countryIndex: number) {
      commit("TOGGLE_VISITED_BY_INDEX", countryIndex);
    },
  },
  getters: {
    visitedCountries({ countries }) {
      return countries.filter(country => country.isVisited);
    },
    filteredCountries({ countries, searchText }) {
      return countries.filter(country =>
        country.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    },
    filteredVisitedCountries({ countries, searchText }) {
      return countries.filter(
        country =>
          country.isVisited &&
          country.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    },
    searchText({ searchText }) {
      return searchText;
    },
  },
} as const satisfies StoreOptions<State>;

export const store = createStore<State>(storeOptions);

type Getters = (typeof storeOptions)["getters"];
type GetterReturns = {
  [TGetterKey in keyof Getters]: ReturnType<Getters[TGetterKey]>;
};

type Actions = (typeof storeOptions)["actions"];
type Dispatch = <T extends keyof Actions>(
  type: T,
  payload?: Parameters<Actions[T]>[1],
  options?: DispatchOptions,
) => ReturnType<Actions[T]>;

export function useStore() {
  return store as Omit<Store<State>, "getters" | "dispatch"> & {
    getters: GetterReturns;
    dispatch: Dispatch;
  };
}
