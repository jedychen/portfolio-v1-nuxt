<template>
  <v-row
    v-if="content"
    no-gutters
    class="my-8 pb-16 up-next-section"
  >
    <v-col
      cols="12"
    >
      <v-divider 
        class="accent"
      />
      <h2
        class="mt-16 mb-4 up-next-title"
      >
        Other work
      </h2>
    </v-col>
    <v-col
      v-for="project in content"
      :key="project.title"
      cols="12"
      md="4"
    >
      <v-hover
        v-slot:default="{ hover }"
      >
        <v-card
          :href="'/work/'+project.slug"
          class="mt-4"
        >
          <v-img
            gradient="rgba(0, 0, 0, 0.3),
                        rgba(0, 0, 0, 0)"
            :aspect-ratio="3/2"
            :src="getProjectImage(project).file.url"
            :alt="getProjectImage(project).title"
            :lazy-src="getProjectImage(project).description"
            class="up-next-section__image transition-swing"
            :class="{
              'up-next-section--selected': hover,
            }"
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
  .v-image__image {
    transition: opacity 0.2s ease-in-out;
  }

  .up-next-section__sub-title {
    transition: opacity 0.2s ease-in-out;
  }
}

.up-next-title {
  font-family: 'CantataOne-Regular', serif;
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.0em;
  background: linear-gradient( rgba(183, 75, 65, 1) 10%, rgba(248, 136, 38, 1) 40%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.up-next-section--selected {
  .v-image__image {
    opacity: 0.5;
  }

  .up-next-section__sub-title {
    opacity: 0.8;
  }
}

.up-next-section__sub-title {
  font-family: 'Montserrat-Regular', sans-serif;
  font-size: 48px;
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

  methods: {
    getProjectImage(project) {
      if (project.linkImage !=  null) {
        return project.linkImage;
      }
      return project.coverImage;
    }
  },
}
</script>
