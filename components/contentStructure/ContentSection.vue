<template>
  <v-row class="mb-12">
    <!-- Render section's title and intro. -->
    <v-col cols="12">
      <h1
        :id="
          section.slug
            .toLowerCase()
            .trim()
            .split(' ')
            .join('-')
        "
        class="mt-16 content-section__title"
      >
        {{ section.title }}
      </h1>
      <p class="text-h5 ml-1 mb-4">
        &#95;&#95;&#95;&#95;&#95;
      </p>
      <p
        v-if="section.description"
        class="text-h6 content-section__subtitle mb-6"
      >
        {{ section.description }}
      </p>
    </v-col>
    <!-- Render content blocks. -->
    <template v-for="(block, index) in section.contents">
      <ContentBlock
        :key="block.title + ' block' + index"
        :block="block"
        @ready="childReady"
      />
    </template>
  </v-row>
</template>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables"; // For breakpoint specific styles

.content-section__title {
  font-family: $title-font-family, sans-serif;
  font-size: $font-size-md-screen-lg;
  font-weight: $font-weight-bold;
  line-height: $line-height-sm;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    font-size: $font-size-md-screen-sm;
  }
}

.content-section__subtitle {
  color: $neutral-grey-c;
  line-height: $line-height-md;
  width: 60%;
}
</style>

<script>
import ContentBlock from "@/components/contentStructure/ContentBlock";
import ContentBlockEmpty from "@/components/contentStructure/ContentBlockEmpty";

export default {
  name: "ContentSection",

  components: {
    ContentBlock,
    ContentBlockEmpty
  },

  props: {
    section: {
      default: null,
      type: Object
    }
  },

  data() {
    return {};
  },

  methods: {
    childReady() {
      this.$emit("ready");
    }
  }
};
</script>
