<template>
  <div class="pb-4">
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
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>
    <p
      v-if="content.caption"
      class="text-h6 mt-4 font-weight-light caption-text"
    >
      <span class="caption-arrow mr-1">&#11096; </span
      >{{ content.image.description }}
    </p>
    <v-dialog v-model="dialog" :max-width="maxWidth">
      <v-img
        :src="require(`~/assets/images/${imgSrc(content.image)}`)"
        :alt="content.image.title"
        :lazy-src="imgBase64(content.image)"
        @load="onReady"
        @click.stop="dialog = false"
        class="inline-image"
      />
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.inline-image {
  cursor: pointer;
}

.caption-arrow {
  color: $caption-symbol-color;
}

.caption-text {
  color: $copy-caption;
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
      return "?w=1740";
    },
    maxWidth() {
      if (this.fullWidth == true) return "1740";
      return "960";
    }
  }
};
</script>
