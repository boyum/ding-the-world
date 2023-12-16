<script setup lang="ts">
import { computed } from "vue";
import mapImg from "../assets/world.svg?raw";
import { useStore } from "../store";
import type { Country } from "../types";

const store = useStore();

/**
 * Returns a color based on a hue. The saturation and lightness are fixed, thus making the colors
 * more similar to each other. The way this is set up, and because countries are sorted
 * alphabetically by name, the colors will be similar for countries that are close to each other.
 * This mostly does not matter, but it's something to keep in mind.
 *
 * @param hue A number between 0 and 360
 */
const getColor = (hue: number) => `hsl(${hue}deg 40% 70%)`;

const visitedCountries = computed(() => store.getters.visitedCountries);
const visitedCountriesCss = computed(() => {
  const style = visitedCountries.value
    .map(
      (country: Country) => `
    [data-name='${country.name}'] {
      fill: ${getColor(country.index)};
    }
    `,
    )
    .join(" ");

  return `<style>${style}</style>`;
});

function toggleVisited(event: MouseEvent) {
  const country = (event.target as HTMLElement).closest<HTMLElement>(
    "path[data-name]",
  );

  const userClickedOnACountry = country !== null;
  if (!userClickedOnACountry) {
    return;
  }

  const countryName = country.dataset.name;
  store.dispatch("toggleVisited", { countryName });
}
</script>

<template>
  <div class="map-container">
    <div class="map" v-html="mapImg" @click="toggleVisited" />
    <div class="style" v-html="visitedCountriesCss" />
  </div>
</template>

<style>
.map-container {
  grid-area: map;
}

.map svg {
  max-width: 100%;
}

svg [data-name] {
  cursor: pointer;
  transition: fill 0.5s ease-in-out; /* Slower transition on hover out */
}

svg [data-name]:hover {
  fill: hsla(326deg 29% 80%);
  transition-duration: 0.15s; /* Faster transition on hover in */
}

.style {
  display: none;
}
</style>
