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
          :src="slide.file.url + sizeSetting"
          :alt="slide.title"
          :lazy-src="slide.description"
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
      },
      fullWidth: {
        default: true,
        type: Boolean
      },
    },

    data () {
      return {
        currentIndex: 0,
      }
    },

    computed: {
      currentDescription() {
        if (this.content.captions)
          return this.content.captions[this.currentIndex]
        return ''
      },
      sizeSetting() {
        return '?w=' + this.maxWidth
      },
      maxWidth() {
        if (this.fullWidth == true)
          return '1740'
        return '960'
      }
    },

    methods: {
      onReady() {
        this.$emit("ready");
      }
    },
  }
</script>
