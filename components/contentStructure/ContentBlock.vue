<template>
  <!-- Single Content Block -->
  <v-col cols="6" :md="width" class="pa-4 content-block">
    <ContentComponent
      :component="block"
      :fullWidth="fullWidth"
      @ready="childReady"
    />
  </v-col>
</template>

<style lang="scss" scoped>
.content-block {
  cursor: default;
}
</style>

<script>
import ContentComponent from "@/components/contentStructure/ContentComponent";

export default {
  name: "ContentBlock",

  components: {
    ContentComponent
  },

  props: {
    block: {
      default: null,
      type: Object
    }
  },

  computed: {
    width() {
      if (this.block.fullWidth && this.block.fullWidth == true) return 12;
      return 8;
    },
    fullWidth() {
      if (this.block.fullWidth && this.block.fullWidth == true) return true;
      return false;
    }
  },

  methods: {
    childReady() {
      this.$emit("ready");
    }
  }
};
</script>
