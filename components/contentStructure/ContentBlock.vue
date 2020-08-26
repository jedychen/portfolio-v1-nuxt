<template>
  <!-- Single Content Block -->
  <v-col
    cols="12"
    :md="width"
    class="my-6"
  >
    <ContentComponent
      v-for="(item, i) in block.inlineItems"
      :key="i"
      :component="item"
      :fullWidth="fullWidth"
      @ready="childReady"
    />
  </v-col>
</template>

<script>
import ContentComponent from '@/components/contentStructure/ContentComponent';

export default {
  name: 'ContentBlock',

  components: {
    ContentComponent,
  },

  props: {
    block: {
      default: null,
      type: Object
    },
  },

  computed: {
    width() {
      if (this.block.fullWidth == true)
        return 12;
      return 8;
    },
    fullWidth() {
      if (this.block.fullWidth == true)
        return true;
      return false;
    }
  },

  methods: {
    childReady() {
      this.$emit("ready");
    }
  },
}
</script>
