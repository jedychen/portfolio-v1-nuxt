<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :light="hover ? true : false"
      max-width="344"
      outlined
      nuxt
      shaped
      :ripple="false"
      :to="content.link"
      target="_blank"
      class="mx-auto transition-swing pb-4"
    >
      <v-img
        v-if="content.cover != null"
        :alt="content.cover.title"
        :src="content.cover.file.url + sizeSetting"
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
