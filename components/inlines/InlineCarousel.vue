<template>
  <div class="pb-4">
    <v-carousel
      v-model="currentIndex"
      :cycle="!(content.autoCycle == false)"
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
          :aspect-ratio="16 / 9"
          :src="slide.file.url + sizeSetting"
          :alt="slide.title"
          :lazy-src="slide.description"
        />
      </v-carousel-item>
    </v-carousel>
    <p class="text-h6 mt-4 font-weight-light caption-text">
      <span class="carousel-count font-weight-regular"
        >{{ currentIndex + 1 }} / {{ content.slides.length }}</span
      >
      {{ "&nbsp;&nbsp;&nbsp;&nbsp;" + currentDescription }}
    </p>
  </div>
</template>

<style lang="scss">
.carousel-count {
  color: $caption-symbol-color;
}

.carousel {
  .v-btn--round .v-btn__content .v-icon {
    color: $copy-color;
  }

  .v-window__prev:hover,
  .v-window__next:hover {
    background: $action-element-color;
  }
}

.caption-text {
  color: $copy-caption;
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
    }
  },

  data() {
    return {
      currentIndex: 0
    };
  },

  computed: {
    currentDescription() {
      if (this.content.captions)
        return this.content.captions[this.currentIndex];
      return "";
    },
    sizeSetting() {
      return "?w=" + this.maxWidth;
    },
    maxWidth() {
      if (this.fullWidth == true) return "1740";
      return "960";
    }
  },

  methods: {
    onReady() {
      this.$emit("ready");
    }
  }
};
</script>
