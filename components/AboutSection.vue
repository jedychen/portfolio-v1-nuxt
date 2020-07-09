<template>
  <v-row
    no-gutters
    class="mb-12"
  >
    <!-- Render Introduction. -->
    <v-col
      cols="12"
      md="5"
      class="pa-6"
    >
      <h3 class="text-h3 font-weight-light text-md-right text-sm-left">
        {{ section.title }}
      </h3>
    </v-col>
    <v-col
      cols="12"
      md="1"
      class="hidden-xs hidden-sm"
    />
    <v-col
      cols="12"
      md="6"
      class="pa-6 mt-2"
    >
      <v-row
        no-gutters
      >
        <v-col
          v-for="block in section.contentBlocks"
          :key="block.title"
          cols="12"
          :md="4 + block.isBlock * 8"
          class="mb-7"
        >
          <h5
            class="text-h5 mb-5"
          >
            {{ block.title }}
          </h5>
          <p 
            v-for="item in block.contentItem"
            :key="item"
            class="text-subtitle-1 font-weight-light mb-1"
          >
            {{ item }}
          </p>
        </v-col>

      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  name: 'AboutSection',

  props: {
    section: {
      default: null,
      type: Object
    },
  },

  data () {
    return {}
  },
}
</script>
