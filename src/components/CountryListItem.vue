<template>
  <li class="country" v-bind:class="{ 'country--visited': isVisited }">
    <div class="country__name">{{ country.name }}</div>
    <button
      class="country__toggle-visited"
      type="button"
      @click="_toggleVisited"
    >
      {{ isVisited ? 'Visited!' : 'Visit!' }}
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['country'],
  methods: {
    ...mapActions(['toggleVisited']),
    _toggleVisited: function() {
      this.toggleVisited(this.country.index);
    }
  },
  computed: {
    isVisited: function() {
      return this.country.isVisited;
    }
  }
};
</script>

<style scoped>
.country {
  display: flex;
  margin: 1rem;
}
.country--visited {
  color: green;
}
.country__name {
  flex-grow: 1;
  font-size: 1.25rem;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 30vw;
}

.country__toggle-visited {
  --button-color: #1c9963;
  --button-height: 45px;
  background-color: #fff;
  border: 2px solid var(--button-color);
  border-radius: var(--button-height);
  color: var(--button-color);
  cursor: pointer;
  font-size: inherit;
  height: var(--button-height);
  line-height: var(--button-height);
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
  width: 100px;
}

.country__toggle-visited:focus {
  border-color: #41099b;
  outline: none;
}

.country__toggle-visited:hover,
.country--visited .country__toggle-visited {
  background-color: var(--button-color);
  color: #fff;
}
</style>
