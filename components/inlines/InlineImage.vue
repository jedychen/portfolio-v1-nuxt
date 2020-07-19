<template>
  <div>
    <v-img
      :src="content.image.file.url"
      :alt="content.image.title"
      :lazy-src="imagePlaceholder"
      aspect-ratio="1.7"
      @load="onReady"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          />
        </v-row>
      </template>
    </v-img>
    <p class="subheading mt-2">
      {{ content.image.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "InlineImage",

  props: {
    content: {
      default: null,
      type: Object
    },
  },

  data() {
    return {
      imagePlaceholder: "",
    }
  },

  methods: {
    onReady() {
      this.$emit("ready");
    }
  },

  created() {
    this.imagePlaceholder = this.$store.getters['styleStore/getImagePlaceholder']
  }
}
</script>
