<template>
  <div class="pb-0">
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
          :src="require(`~/assets/images/${imgSrc(slide)}`)"
          :lazy-src="imgBase64(slide)"
          :alt="slide.title"
        />
      </v-carousel-item>
    </v-carousel>
    <p v-if="content.captions" class="text-body-1 caption-text mt-2 ml-0">
      <span class="carousel-count"
        >{{ currentIndex + 1 }} / {{ content.slides.length }}</span
      >{{ "&nbsp;&nbsp;&nbsp;&nbsp;" + currentDescription }}
    </p>
  </div>
</template>

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables"; // For breakpoint specific styles

.carousel-count {
  color: $copy-caption-dot;
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
  font-weight: $font-weight-medium;
  color: $copy-caption;

  .caption-dot {
    color: $copy-caption-dot;
  }
}
</style>

<script>
import imageUtils from "../../assets/js/imageUtils";

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
    },
    imgSrc(image) {
      return imageUtils.imgSrc(image);
    },
    imgBase64(image) {
      return imageUtils.imgBase64(image);
    }
  }
};
</script>
