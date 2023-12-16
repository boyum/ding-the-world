<script setup lang="ts">
import { onBeforeMount } from "vue";
import CountryMap from "./components/CountryMap.vue";
import SearchableList from "./components/SearchableList.vue";
import { store } from "./store";

function fetchCountries() {
  store.dispatch("fetchCountries");
}

function setSearchText(text: string) {
  store.dispatch("setSearchText", text);
}

onBeforeMount(() => {
  fetchCountries();
  setSearchText("");
});
</script>

<template>
  <div id="app" class="app-container"><SearchableList /> <CountryMap /></div>
</template>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  padding: 0;
}

.app-container {
  display: grid;
  grid-template-areas: "searchable-list map map";
}
</style>
