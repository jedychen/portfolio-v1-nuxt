<template>
  <v-app class="main-app">
    <TheHeader id="#scrolling-content" />
    <v-sheet
      id="scrolling-content"
      class="overflow-y-auto sheet-dark"
      max-height="100vh"
    >
      <nuxt />
    </v-sheet>
  </v-app>
</template>

<style lang="scss" scoped></style>

<script>
import TheHeader from "@/components/TheHeader";

export default {
  name: "App",

  components: {
    TheHeader
  }
};
</script>
