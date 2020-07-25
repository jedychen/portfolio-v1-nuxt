<template>
  <div
    class="video-wrapper"
  >
    <vimeo-player
      v-if="content != null"
      ref="player"
      :options="{ responsive: true, muted: content.muted }"
      :video-id="content.videoId"
      :autoplay="content.autoPlay"
      :player-height="1080"
      :player-width="1920"
      :loop="loop"
      class="video-player"
      @ready="onReady"
    />
    <p class="subheading mt-2 font-italic">
      {{ content.description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
// .video-wrapper {
//   position: relative;
//   padding-bottom: 56.25%;
//   background-color: $theme-grey;
// }

// .video-player {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// }
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
      loaded: false,
    }
  },

  computed: {
    loop() {
      if (this.content != null) {
        if (this.content.loop == true)
          return '1'
      }
      return '0'
    },
  },

  methods: {
    onReady() {
      this.loaded = true
      this.$emit("ready")
    }
  }
}
</script>
