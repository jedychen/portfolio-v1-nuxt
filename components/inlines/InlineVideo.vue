<template>
  <div
    :class="{
      'video-wrapper pb-0': !content.smaller,
      'video-wrapper-minified pb-0': content.smaller
    }"
  >
    <div class="video-player__container">
      <vimeo-player
        v-if="content != null"
        ref="player"
        :options="{
          responsive: true,
          muted: content.muted,
          unmute_button: false,
          autopause: !content.autoPlay,
          background: content.background == null ? false : content.background
        }"
        :video-id="videoId"
        :autoplay="content.autoPlay"
        :player-height="1080"
        :player-width="1920"
        :loop="loop"
        class="video-player"
        @ready="onReady"
      />
    </div>
    <p v-if="content.description" class="text-body-1 caption-text mt-2 ml-1">
      <span class="caption-dot">&#8226;</span> {{ content.description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.video-wrapper-minified {
  aspect-ratio: 1/1;

  .video-player__container {
    background-color: black;
  }

  .video-player {
    width: 50%;
    margin-left: 25%;
  }
  // overflow: hidden;
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
