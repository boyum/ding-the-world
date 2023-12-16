<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "../store";
import CountryListItem from "./CountryListItem.vue";

const store = useStore();

const searchText = ref("");

const filteredCountries = computed(() => store.getters.filteredCountries);
const showCountryList = computed(() => filteredCountries.value.length > 0);

function setSearchText() {
  store.dispatch("setSearchText", searchText.value);
}
</script>

<template>
  <div class="searchable-list">
    <label class="searchable-list__search-label">
      Filter countries
      <input
        class="searchable-list__search-field"
        type="text"
        v-model="searchText"
        @keyup="setSearchText"
        placeholder="Ex. Algeria, China, Iran..."
    /></label>
    <div class="searchable-list__empty-state" v-if="!showCountryList">
      No countries to show
    </div>
    <ul class="searchable-list__list" v-if="showCountryList">
      <CountryListItem
        class="searchable-list__list-item"
        v-for="country in filteredCountries"
        v-bind:key="country.index"
        v-bind:country="country"
      />
    </ul>
  </div>
</template>

<style scoped>
.searchable-list {
  --search-field-height: 45px;
  --search-field-margin: 10px;
  --search-label-line-height: 1.5;
  --search-label-font-size: 1rem;

  background-color: #f2f2f2;
  grid-area: searchable-list;
  height: 100vh;
  max-height: 100vh;
  max-width: 350px;
  padding: 0 1.5rem;
  width: 30vw;
}

.searchable-list__search-label {
  display: block;
  font-weight: 600;
  font-size: var(--search-label-font-size);
  line-height: var(--search-label-line-height);
  margin-top: var(--search-field-margin);
}

.searchable-list__search-field {
  display: block;
  height: var(--search-field-height);
  line-height: var(--search-field-height);
  text-indent: 1rem;
  width: 100%;
}

.searchable-list__empty-state {
  font-size: 1.25rem;
  margin-top: 1rem;
}

.searchable-list__list {
  margin: 0 -1rem;
  height: calc(
    100vh -
      (
        var(--search-field-height) + var(--search-field-margin) +
          (var(--search-label-line-height) * var(--search-label-font-size))
      )
  );
  overflow-y: scroll;
  padding: 0;
}
</style>
