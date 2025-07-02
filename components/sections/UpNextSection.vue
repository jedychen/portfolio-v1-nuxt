<template>
  <v-row v-if="content" class="up-next-section elevation-4 pb-8">
    <v-col cols="12" class="pb-0 px-0">
      <v-divider class="secondary" />
    </v-col>
    <v-col cols="12">
      <v-row no-gutters class="pa-0 ma-0">
        <v-col cols="12 mb-4">
          <h1 class="mt-8 mb-4 up-next-title">
            Explore related projects
          </h1>
        </v-col>
        <v-col
          v-for="project in content"
          :key="project.title"
          cols="12"
          md="4"
          class="pa-1"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :href="'/work/' + project.slug" class="mt-0">
              <v-img
                aspect-ratio="1.5"
                :src="
                  require(`~/assets/images/${imgSrc(getProjectImage(project))}`)
                "
                :lazy-src="imgBase64(getProjectImage(project))"
                :alt="getProjectImage(project).title"
                class="up-next-section__image transition-swing"
                :class="{
                  'up-next-section--selected': hover
                }"
              >
              </v-img>
            </v-card>
          </v-hover>
          <p class="mx-2 my-2 up-next-section__sub-title">
            {{ project.title }}
          </p>
          <!-- tags -->
          <div v-if="project.keyWords" class="mr-2">
            <v-chip
              small
              outlined
              v-for="(tag, i) in project.keyWords"
              v-if="i"
              :key="'project main tag' + i"
              class="mr-2 mb-2 tag-text"
            >
              {{ tagDescription(tag) }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss">
@import "~vuetify/src/styles/settings/_variables"; // For breakpoint specific styles

.up-next-section {
  .v-image__image {
    transition: opacity 0.2s ease-in-out;
  }

  .up-next-section__sub-title {
    color: rgba(255, 255, 255, 0.8);
    transition: opacity 0.2s ease-in-out;
    font-family: "Futura-Book", sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: $line-height-sm;
  }
}

.up-next-title {
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-md-screen-lg;
  font-weight: 800;
  line-height: $line-height-sm;
  color: $theme-yellow;

  @media #{map-get($display-breakpoints, 'md-and-down')} {
    font-size: $font-size-lg-screen-sm;
  }
}

.up-next-section--selected {
  .v-image__image {
    opacity: 0.7;
  }
}

.up-next-section__image {
  align-items: end;
}

.up-next-section__image .v-image__image {
  background-size: 100% 100%;
}

.up-next-section {
  .tag-text {
    color: $neutral-grey-b;
  }
}
</style>

<script>
import imageUtils from "../../assets/js/imageUtils";

export default {
  name: "UpNextSection",

  props: {
    content: {
      default: null,
      type: Array
    }
  },

  methods: {
    getProjectImage(project) {
      if (project.linkImage != null) {
        return project.linkImage;
      }
      return project.coverImage;
    },
    getProjectColor(project) {
      return project.themeColor;
    },
    imgSrc(img) {
      return imageUtils.imgSrc(img);
    },
    imgBase64(img) {
      return imageUtils.imgBase64(img);
    },
    tagDescription(tag) {
      const textArray = tag.split(":");
      let description = tag;
      if (textArray.length > 1) {
        description = tag.replace(textArray[0] + ":", "");
      }
      return description.replaceAll(",", " ");
    }
  }
};
</script>
