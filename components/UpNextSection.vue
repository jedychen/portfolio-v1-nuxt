<template>
  <v-row
    no-gutters
    class="my-16"
  >
    <v-col
      cols="12"
      class="px-7 mt-16"
    >
      <v-divider 
        color="white"
      />
      <h2 class="mt-16 mb-4 text-h3 font-weight-light">
        Other work
      </h2>
    </v-col>
    <v-col
      v-for="project in content"
      :key="project.title"
      cols="12"
      md="4"
      class="pa-6"
    >
      <v-card
        :href="project.slug"
        class="ml-1 mt-4"
      >
        <v-img
          gradient="rgba(0, 0, 0, 0.3),
                       rgba(0, 0, 0, 0)"
          :aspect-ratio="3/2"
          :src="project.coverImage.file.url"
        >
          <p
            :style="'color:'+project.themeColor"
            class="mx-4 my-4 up-next-section__sub-title"
          >
          {{ project.title }}
          </p>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.up-next-section__sub-title {
  font-family: 'Mayeka-Regular', sans-serif;
  font-size: 40px;
  font-weight: 400;
  line-height: 1em;
}
</style>

<script>
export default {
  name: 'UpNextSection',

  props: {
    content: {
      default: null,
      type: Array,
    },
  },

  data () {
    return {}
  },
}
</script>
