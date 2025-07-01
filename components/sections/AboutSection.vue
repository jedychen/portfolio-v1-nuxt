<template>
  <v-row no-gutters class="mb-12">
    <!-- Render Introduction. -->
    <v-col cols="12" md="2" class="py-6">
      <h3 class="text-md-right text-sm-left about-section__title">
        {{ section.title }}
      </h3>
    </v-col>
    <v-col cols="12" md="9" class="py-3 mt-2 offset-md-1">
      <v-row>
        <v-col
          v-for="block in section.contentBlocks"
          :key="block.title"
          cols="12"
          :md="4 + block.isBlock * 8"
          :sm="6 + block.isBlock * 6"
          class="mb-4 about-section__content"
        >
          <h5 class="text-body-1 mb-2">
            {{ block.title }}
          </h5>
          <v-divider color="white" class="mb-2"></v-divider>
          <p
            v-for="item in block.contentItem"
            :key="item"
            class="text-body-1 font-weight-light mb-0"
          >
            {{ item }}
          </p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables"; // For breakpoint specific styles

.about-section__title {
  // color: $theme-orange;
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-lg-screen-sm;
  font-weight: 500;
  line-height: $line-height-sm;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    font-size: $font-size-lg-screen-sm;
  }
}

.about-section__content {
  background-color: $copy-color-black-transparent;
}
</style>

<script>
export default {
  name: "AboutSection",

  props: {
    section: {
      default: null,
      type: Object
    }
  },

  data() {
    return {};
  }
};
</script>
