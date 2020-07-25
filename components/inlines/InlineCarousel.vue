<template>
  <div
    class="mb-2"
  >
    <v-carousel
      v-model="currentIndex"
      cycle
      continuous
      hide-delimiter-background
      hide-delimiters
      @ready="onReady"
      height="auto"
    >
      <v-carousel-item
        v-for="(slide, i) in content.slides"
        :key="content.title + i"
        eager
      >
        <v-img
          :aspect-ratio="16/9"
          :src="slide.file.url"
          :alt="slide.file.title"
        />
      </v-carousel-item>
    </v-carousel>
    <v-row
        class="mt-2"
        v-if="currentDescription"
      >
      <v-col
        cols="12"
        sm="2"
        class="pb-0"
      >
        <p class="subheading font-italic mb-0 font-weight-bold">
          {{ currentIndex + 1 }} / {{ content.slides.length }}
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="10"
        class="pb-0"
      >
        <p class="subheading font-italic">
          {{ currentDescription }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
  export default {
    name: "InlineCarousel",

    props: {
      content: {
        default: null,
        type: Object
      }
    },

    data () {
      return {
        currentIndex: 0,
      }
    },

    computed: {
      currentDescription() {
        return this.content.slides[this.currentIndex].description
      }
    },

    methods: {
      onReady() {
        this.$emit("ready");
      }
    }
  }
</script>
