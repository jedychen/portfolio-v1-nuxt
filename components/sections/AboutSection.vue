<template>
  <v-row no-gutters class="mb-12">
    <!-- Render Introduction. -->
    <v-col cols="12" md="4" class="py-6">
      <h3 class="text-md-right text-sm-left about-section__title">
        {{ section.title }}
      </h3>
    </v-col>
    <v-col cols="12" md="7" class="py-3 mt-2 offset-md-1">
      <v-row>
        <v-col
          v-for="block in section.contentBlocks"
          :key="block.title"
          cols="12"
          :md="4 + block.isBlock * 8"
          :sm="6 + block.isBlock * 6"
          class="mb-4 about-section__content"
        >
          <h5 class="text-h5 mb-4">
            {{ block.title }}
          </h5>
          <p
            v-for="item in block.contentItem"
            :key="item"
            class="text-subtitle-1 font-weight-light mb-0"
          >
            {{ item }}
          </p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.about-section__title {
  color: $theme-orange;
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-lg-screen-lg;
  font-weight: 500;
  line-height: $line-height-sm;
  @include bp(sm) {
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
