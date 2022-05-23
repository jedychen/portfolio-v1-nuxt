<template>
  <v-row v-if="content" class="mb-8 pb-16 up-next-section">
    <v-col cols="12">
      <v-divider class="secondary" />
    </v-col>
    <v-col cols="12" sm="10" class="offset-sm-1">
      <v-row>
        <v-col cols="12">
          <h2 class="mt-8 mb-4 up-next-title">
            Other work
          </h2>
        </v-col>
        <v-col v-for="project in content" :key="project.title" cols="12" md="4">
          <v-hover v-slot:default="{ hover }">
            <v-card :href="'/work/' + project.slug" class="mt-0">
              <v-img
                gradient="rgba(0, 0, 0, 0.3),
                        rgba(0, 0, 0, 0)"
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
                <p
                  :style="'color:' + getProjectColor(project)"
                  class="mx-4 my-4 up-next-section__sub-title"
                >
                  {{ project.title }}
                </p>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
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
  font-family: "CantataOne-Regular", serif;
  font-size: $font-size-lg-screen-lg;
  font-weight: 500;
  line-height: $line-height-sm;
  color: $theme-yellow;
  @include bp(sm) {
    font-size: $font-size-lg-screen-sm;
  }
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
  font-family: "Montserrat-Regular", sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  line-height: $line-height-sm;
}

.up-next-section__image .v-image__image {
  background-size: 100% 100%;
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
      if (project.linkColor != null) {
        return project.linkColor;
      }
      return project.themeColor;
    },
    imgSrc(img) {
      return imageUtils.imgSrc(img);
    },
    imgBase64(img) {
      return imageUtils.imgBase64(img);
    }
  }
};
</script>
