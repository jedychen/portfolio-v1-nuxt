<template>
  <v-row
    v-if="content"
    no-gutters
    class="my-8 pb-16 up-next-section"
  >
    <v-col
      cols="12"
      class="px-7"
    >
      <v-divider 
        class="secondary"
      />
      <h2
        class="mt-16 mb-4 text-h3 font-weight-light"
      >
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

      <v-hover
        v-slot:default="{ hover }"
      >
        <v-card
          :href="project.slug"
          :class="`elevation-${hover ? 12 : 0}`"
          class="ml-1 mt-4 transition-swing"
        >
          <v-img
            gradient="rgba(0, 0, 0, 0.3),
                        rgba(0, 0, 0, 0)"
            :aspect-ratio="3/2"
            :src="project.coverImage.file.url"
            :lazy-src="imagePlaceholder"
            :alt="project.coverImage.title"
            class="up-next-section__image"
          >
            <p
              :style="'color:'+project.themeColor"
              class="mx-4 my-4 up-next-section__sub-title"
            >
            {{ project.title }}
            </p>
          </v-img>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.up-next-section {
  background: linear-gradient(180deg, rgba(88, 78, 87, 1) 20%, rgba(183, 75, 65, 1) 60%, rgba(248, 136, 38, 1) 100%);
};

.up-next-section__sub-title {
  font-family: 'Mayeka-Regular', sans-serif;
  font-size: 40px;
  font-weight: 400;
  line-height: 1em;
}

.up-next-section__image .v-image__image {
  background-size: 100% 100%;
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
    return {
      imagePlaceholder: "",
    }
  },

  created() {
    this.imagePlaceholder = this.$store.getters['styleStore/getImagePlaceholder']
  }
}
</script>
