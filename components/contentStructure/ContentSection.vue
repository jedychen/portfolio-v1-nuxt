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
        :class="{
          'mb-10': !section.description,
          'mb-2': section.description
        }"
      >
        {{ section.title }}
      </h1>
      <p v-if="section.description" class="text-h5 content-section__subtitle">
        &#95;&#95;&#95;&#95;&#95;&#95;
      </p>
      <p
        v-if="section.description"
        class="text-h5 content-section__subtitle mb-6"
      >
        {{ section.description }}
      </p>
    </v-col>
    <!-- Render content blocks. -->
    <template v-for="(block, index) in section.contents">
      <template v-if="block.alternateColumn && block.fullWidth == false">
        <!-- 1. When the previous block is half width -->
        <!-- Add two empty blocks to alternate this block's column, -->
        <!-- and make this block have negative top margin. -->
        <!-- 2. When the previous block is full width -->
        <!-- Add one empty blocks to alternate this block's column -->
        <!-- and no need to add negative top margin. -->
        <ContentBlockEmpty :key="block.title + ' empty block 1'" />
        <template
          v-if="
            !section.contents[index - 1].alternateColumn &&
              section.contents[index - 1].fullWidth == false
          "
        >
          <ContentBlockEmpty :key="block.title + ' empty block 2'" />
        </template>
      </template>
      <ContentBlock
        :key="block.title + ' block' + index"
        :block="block"
        @ready="childReady"
      />
    </template>
  </v-row>
</template>

<style lang="scss" scoped>
.content-section__title {
  font-family: "CantataOne-Regular", serif;
  font-size: $font-size-md-screen-lg;
  font-weight: 400;
  line-height: $line-height-sm;
  @include bp(sm) {
    font-size: $font-size-md-screen-sm;
  }
}
.content-section__subtitle {
  color: $theme-orange;
  line-height: $line-height-md;
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
