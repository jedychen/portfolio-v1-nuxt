<template>
  <div class="pb-0">
    <v-img
      :src="require(`~/assets/images/${imgSrc(content.image)}`)"
      :alt="content.image.title"
      :lazy-src="imgBase64(content.image)"
      @load="onReady"
      @click.stop="dialog = true"
      class="inline-image"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="white" />
        </v-row>
      </template>
    </v-img>
    <p
      v-if="content.image.description"
      class="text-body-1 caption-text mt-2 ml-1"
    >
      <span class="caption-dot">&#8226;</span> {{ content.image.description }}
    </p>

    <v-dialog v-model="dialog" :max-width="maxWidth">
      <v-img
        :src="require(`~/assets/images/${imgSrc(content.image)}`)"
        :alt="content.image.title"
        :lazy-src="imgBase64(content.image)"
        @load="onReady"
        @click.stop="dialog = false"
        class="inline-image inline-image__dialog"
      />
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.inline-image {
  cursor: zoom-in;
  align-items: end;
}

.inline-image.inline-image__dialog {
  cursor: zoom-out;
}

.caption-arrow {
  color: $caption-symbol-color;
}

.caption-text {
  color: $copy-caption;
  font-weight: $font-weight-medium;

  .caption-dot {
    color: $copy-caption-dot;
  }
}
</style>

<script>
import imageUtils from "../../assets/js/imageUtils";

export default {
  name: "InlineImage",

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
    sizeSettingMax() {
      return "?w=1920";
    },
    maxWidth() {
      if (this.fullWidth == true) return "1920";
      return "960";
    }
  }
};
</script>
