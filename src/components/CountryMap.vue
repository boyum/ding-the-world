<template>
  <div class="map-container">
    <div class="map" v-html="mapImg" />
    <div class="style" v-html="visitedCountriesCss" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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

.style {
  display: none;
}
</style>
