<template>
  <div>
    <v-img
      :src="content.image.file.url + sizeSetting"
      :alt="content.image.title"
      :lazy-src="content.image.description"
      @load="onReady"
      @click.stop="dialog = true"
      class="inline-image"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-row>
      </template>
    </v-img>
    <p class="subheading mt-2 font-italic">
      {{ content.caption }}
    </p>
    <v-dialog
      v-model="dialog"
      max-width="1740"
    >
      <v-img
        :src="content.image.file.url + sizeSettingMax"
        :alt="content.image.title"
        :lazy-src="content.image.description"
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
</style>

<script>
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
    },
  },

  data() {
    return {
      dialog: false,
    }
  },

  methods: {
    onReady() {
      this.$emit("ready");
    }
  },

  computed: {
    sizeSetting() {
      return '?w=' + this.maxWidth
    },
    sizeSettingMax() {
      return '?w=1740'
    },
    maxWidth() {
      if (this.fullWidth == true)
        return '1740'
      return '960'
    }
  },
}
</script>
