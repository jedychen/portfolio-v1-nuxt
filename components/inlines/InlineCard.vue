<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :light="hover ? true : false"
      outlined
      nuxt
      shaped
      :ripple="false"
      :to="content.link"
      target="_blank"
      class="mx-auto transition-swing pb-0"
    >
      <v-img
        v-if="content.cover != null"
        :alt="content.cover.title"
        :src="require(`~/assets/images/${imgSrc(content.cover)}`)"
        :lazy-src="imgBase64(content.cover)"
        height="200px"
        @load="onReady"
        class="inline-card-image transition-swing"
        :class="{
          'inline-card__image--hovered': hover
        }"
      />

      <v-card-title>
        {{ content.title }}
      </v-card-title>

      <v-card-subtitle>
        {{ content.description }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn text depressed class="disable-events inline-card__cta">
          {{ content.ctaText }}
        </v-btn>
        <v-icon color="primary">
          mdi-arrow-right
        </v-icon>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<style lang="scss" scoped>
.disable-events {
  pointer-events: none;
}

.inline-card__cta {
  color: $theme-yellow;
}

.inline-card__image--hovered {
  filter: brightness(120%);
}
</style>

<script>
import imageUtils from "../../assets/js/imageUtils";

export default {
  name: "InlineCard",

  props: {
    content: {
      default: null,
      type: Object
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
  },

  computed: {
    sizeSetting() {
      return "?w=" + this.maxWidth;
    },
    maxWidth() {
      return "760";
    }
  }
};
</script>
