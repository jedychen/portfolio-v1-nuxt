<template>
  <v-app 
    dark
    class="main-app"
  >
    <TheHeader id="#scrolling-content" />
    <v-sheet
      id="scrolling-content"
      class="overflow-y-auto"
      max-height="100vh"
    >
      <nuxt />
    </v-sheet>
  </v-app>
</template>

<style lang="scss">
body {
  background: black;
}
</style>

<script>
import TheHeader from '@/components/TheHeader';

export default {
  name: 'App',

  components: {
    TheHeader,
  },

  data() {
    return {
    }
  },
};
</script>
