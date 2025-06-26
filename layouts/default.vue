<template>
  <v-app class="main-app">
    <TheHeader id="#scrolling-content" />
    <v-sheet
      id="scrolling-content"
      class="overflow-y-auto sheet-dark sheet-theme"
      max-height="100vh"
    >
      <nuxt />
    </v-sheet>
  </v-app>
</template>

<style lang="scss" scoped>
.sheet-theme {
  scrollbar-width: none !important;
}
</style>

<script>
import TheHeader from "@/components/TheHeader";

export default {
  name: "App",

  components: {
    TheHeader
  }
};
</script>
