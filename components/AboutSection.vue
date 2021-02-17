<template>
  <v-row
    no-gutters
    class="mb-12"
  >
    <!-- Render Introduction. -->
    <v-col
      cols="12"
      md="4"
      class="py-6"
    >
      <h3 class="text-md-right text-sm-left about-section__title">
        {{ section.title }}
      </h3>
    </v-col>
    <v-col
      cols="12"
      md="1"
      class="hidden-xs hidden-sm"
    />
    <v-col
      cols="12"
      md="7"
      class="py-6 mt-2"
    >
      <v-row
        no-gutters
      >
        <v-col
          v-for="block in section.contentBlocks"
          :key="block.title"
          cols="12"
          :md="4 + block.isBlock * 8"
          :sm="6 + block.isBlock * 6"
          class="mb-4"
        >
          <h5
            class="text-h5 mb-3 about-section_subtitle"
          >
            {{ block.title }}
          </h5>
          <p 
            v-for="item in block.contentItem"
            :key="item"
            class="text-subtitle-1 mb-1 about-section__content"
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
  color: $theme-yellow;
  font-family: 'CantataOne-Regular', serif;
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.1em;
  @include bp(sm){
    font-size: 2.5rem;
  }
}

.about-section_subtitle {
  background-color: $copy-color-black-transparent;
}

.about-section__content {
  color: $copy-color-med-grey;
}
</style>

<script>
export default {
  name: 'AboutSection',

  props: {
    section: {
      default: null,
      type: Object
    },
  },

  data () {
    return {}
  },
}
</script>
