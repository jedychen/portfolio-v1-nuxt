<template>
  <div>
    <v-img
      :src="content.image.file.url"
      :alt="content.image.title"
      lazy-src="data:image/jpeg;base64,/9j/2wCEAAIBAQEBAQIBAQIDAgECAwMCAgICAwMDAwMDAwMFAwQEBAQDBQUFBgYGBQUHBwgIBwcKCgoKCgwMDAwMDAwMDAwBAgICBAMEBwUFBwoIBwgKDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/dAAQAFP/uAA5BZG9iZQBkwAAAAAH/wAARCABaAKADABEAAREBAhEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAkBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwAAARECEQA/AJDgAAAAAAAAAAAAAAAAAAA//9CQ4AAAAAAAAAAAAAAAAAAAP//RkOAAAAAAAAAAAAAAAAAAAD//0pDgAAAAAAAAAAAAAAAAAAA//9OQ4AAAAAAAAAAAAAAAAAAAP//UkOAAAAAAAAAAAAAAAAAAAD//1ZDgAAAAAAAAAAAAAAAAAAA//9aQ4AAAAAAAAAAAAAAAAAAAP//XkOAAAAAAAAAAAAAAAAAAAD//0JDgAAAAAAAAAAAAAAAAAAA//9GQ4AAAAAAAAAAAAAAAAAAAP//SkOAAAAAAAAAAAAAAAAAAAD//2Q=="
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
    return {}
  },

  methods: {
    onReady() {
      this.$emit("ready");
    }
  }
}
</script>
