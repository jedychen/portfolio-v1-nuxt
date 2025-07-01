<template>
  <div class="pb-0 inline-iframe-container">
    <v-card class="aspect-ratio">
      <iframe
        style="width:100%"
        loading="lazy"
        :name="content.title"
        height="300"
        :src="content.url"
        class="inline-iframe"
      />
      <v-btn class="mx-2 my-2" dark :href="content.url" target="_blank">
        <v-icon dark>mdi-fullscreen</v-icon>
        &nbsp;Full Screen
      </v-btn>
    </v-card>
    <p v-if="content.caption" class="text-body-1 caption-text mt-2 ml-1">
      <span class="caption-dot">&#8226;</span> {{ content.caption }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.inline-iframe-container {
  cursor: default;
}

.inline-iframe {
  border: 2px solid $theme-grey;
}

/* This element defines the size the iframe will take.
   In this example we want to have a ratio of 16:9 */
.aspect-ratio {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* The height of the item will now be 56.25% of the width. */
}

/* Adjust the iframe so it's rendered in the outer-width and outer-height of it's parent */
.aspect-ratio iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.caption-arrow {
  color: $caption-symbol-color;
}

.caption-text {
  color: $copy-caption;

  .caption-dot {
    color: $copy-caption-dot;
  }
}
</style>

<script>
export default {
  name: "InlineIframe",

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
      dialog: false
    };
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
    sizeSettingMax() {
      return "?w=1740";
    },
    maxWidth() {
      if (this.fullWidth == true) return "1740";
      return "960";
    }
  }
};
</script>
