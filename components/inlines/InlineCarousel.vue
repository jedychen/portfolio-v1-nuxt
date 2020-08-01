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
          :lazy-src="imagePlaceholder"
        />
      </v-carousel-item>
    </v-carousel>
    <p class="mt-2 subheading font-italic">
      {{ currentIndex + 1 }} / {{ content.slides.length }} {{ '&nbsp;&nbsp;&nbsp;&nbsp;' + currentDescription }}
    </p>
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
        imagePlaceholder: "",
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
    },

    created() {
      this.imagePlaceholder = this.$store.getters['styleStore/getImagePlaceholder']
    }
  }
</script>
