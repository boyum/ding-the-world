<template>
  <div id="app" class="app-container"><SearchableList /> <CountryMap /></div>
</template>

<script>
import { mapActions } from "vuex";
import CountryMap from "./components/CountryMap.vue";
import SearchableList from "./components/SearchableList.vue";

export default {
  name: "App",
  components: { SearchableList, CountryMap },
  methods: mapActions(["fetchCountries", "setSearchText"]),
  beforeMount() {
    this.fetchCountries();
    this.setSearchText("");
  },
};
</script>

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
