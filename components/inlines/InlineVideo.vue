<template>
  <div class="video-wrapper pb-0">
    <vimeo-player
      v-if="content != null"
      ref="player"
      :options="{
        responsive: true,
        muted: content.muted,
        autopause: !content.autoPlay
      }"
      :video-id="videoId"
      :autoplay="content.autoPlay"
      :player-height="1080"
      :player-width="1920"
      :loop="loop"
      class="video-player"
      @ready="onReady"
    />
    <p
      v-if="content.description"
      class="text-h6 mt-4 font-weight-light caption-text"
    >
      <span class="caption-arrow mr-1">&#11096; </span>{{ content.description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.caption-arrow {
  color: $caption-symbol-color;
}

.caption-text {
  color: $copy-caption;
}
</style>

<script>
export default {
  name: "InlineVideo",

  props: {
    content: {
      default: null,
      type: Object
    }
  },

  data() {
    return {
      loaded: false
    };
  },

  computed: {
    loop() {
      if (this.content != null) {
        if (this.content.loop == true) return true;
      }
      return false;
    },
    videoId() {
      return this.content.videoId.toString();
    }
  },

  methods: {
    onReady() {
      this.loaded = true;
      this.$emit("ready");
    }
  }
};
</script>
