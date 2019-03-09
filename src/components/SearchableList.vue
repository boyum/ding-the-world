<template>
  <div class="searchable-list">
    <input
      class="searchable-list__search-field"
      type="text"
      v-model="$data._searchText"
      @keyup="_setSearchText"
    />
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

<script>
import { mapGetters, mapActions } from 'vuex';
import CountryListItem from './CountryListItem.vue';

export default {
  computed: {
    ...mapGetters([
      'searchText',
      'filteredCountries',
      'visitedCountries',
      'filteredVisitedCountries'
    ]),
    showCountryList: function() {
      return this.filteredCountries.length > 0;
    }
  },
  data: () => ({
    _searchText: ''
  }),
  methods: {
    ...mapActions(['setSearchText']),
    _setSearchText() {
      this.setSearchText(this._data._searchText);
    }
  },
  components: {
    CountryListItem
  }
};
</script>

<style scoped>
.searchable-list {
  --search-field-height: 45px;
  --search-field-margin: 10px;
  background-color: #f2f2f2;
  grid-area: searchable-list;
  max-height: 100vh;
  max-width: 350px;
  padding: 0 1.5rem;
  width: 30vw;
}

.searchable-list__list {
  margin: 0 -1rem;
  height: calc(
    100vh - (var(--search-field-height) + var(--search-field-margin))
  );
  overflow-y: scroll;
  padding: 0;
}

.searchable-list__search-field {
  display: block;
  height: var(--search-field-height);
  line-height: var(--search-field-height);
  margin-top: var(--search-field-margin);
  width: 100%;
}
</style>
