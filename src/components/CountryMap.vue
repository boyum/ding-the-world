<template>
  <div class="map-container">
    <div class="map" v-html="mapImg" @click="_toggleVisited" />
    <div class="style" v-html="visitedCountriesCss" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MapImg from '../assets/world.svg';
export default {
  data() {
    return { mapImg: MapImg };
  },
  computed: {
    ...mapGetters(['visitedCountries']),
    visitedCountriesCss: function() {
      const style = this.visitedCountries
        .map(
          (country, index) => `
        [data-name='${country.name}'] {
          fill: rgb(200, ${country.index}, 255) !important;
        }
      `
        )
        .join(' ');

      return `<style>${style}</style>`;
    }
  },
  methods: {
    ...mapActions(['toggleVisited']),
    _toggleVisited: function(event) {
      const country = event.target.closest('path[data-name]');
      const aCountryWasClicked = country !== null;

      if (!aCountryWasClicked) {
        return;
      }

      const countryName = country.dataset.name;
      this.toggleVisited({ countryName });
    }
  }
};
</script>

<style>
.map-container {
  grid-area: map;
}

.map svg {
  max-width: 100%;
}

svg [data-name] {
  transition: fill 0.15s ease-in-out;
}

svg [data-name]:hover {
  cursor: pointer;
  fill: rgba(126, 30, 89, 0.3) !important;
}

.style {
  display: none;
}
</style>
