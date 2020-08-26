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
      class="carousel"
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
    <p class="text-h6 mt-4 mb-10">
      <span class="carousel-count">{{ currentIndex + 1 }} / {{ content.slides.length }}</span> {{ '&nbsp;&nbsp;&nbsp;&nbsp;' + currentDescription }}
    </p>
  </div>
</template>

<style lang="scss">
.carousel-count {
  color: $theme-yellow;
}

.carousel {
  .v-btn--round .v-btn__content .v-icon {
    color: $copy-color;
  }

  .v-window__prev:hover, .v-window__next:hover {
    background: $theme-yellow;
  }
}
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
