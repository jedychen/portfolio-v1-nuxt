<template>
  <v-row v-if="otherProjects" class="up-next-section elevation-4 pb-8">
    <v-col cols="12" class="pb-0 px-0">
      <v-divider class="secondary" />
    </v-col>
    <v-col cols="12">
      <v-row no-gutters class="pa-0 ma-0">
        <v-col cols="12 mb-4">
          <h1 class="mt-8 mb-4 up-next-title">
            Explore more projects
          </h1>
        </v-col>
        <v-col
          v-for="project in otherProjects"
          :key="project.title"
          cols="12"
          md="4"
          class="pa-1"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :href="'/work/' + project.slug"
              class="mt-0"
              :ripple="false"
            >
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
          <p class="mx-2 my-2 up-next-section__subtitle">
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

  .up-next-section__subtitle {
    color: rgba($neutral-white, 0.8);
    transition: opacity 0.2s ease-in-out;
    font-family: "Futura-Book", sans-serif;
    font-size: 1.8rem;
    font-weight: $font-weight-regular;
    line-height: $line-height-sm;
  }
}

.up-next-title {
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-md-screen-lg;
  font-weight: $font-weight-bold;
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
import contentful from "@/plugins/contentful.js";
import * as prettify from "pretty-contentful";

export default {
  name: "UpNextSection",

  props: {
    projectId: {
      default: "",
      type: String
    }
  },

  data() {
    return {
      projectLinks: []
    };
  },

  async mounted() {
    this.projectLinks = this.$store.getters["styleStore/getProjectConfigs"];
    if (this.projectLinks == "") {
      let response = await Promise.all([
        // fetch all blog posts sorted by creation date
        contentful.getEntries({
          content_type: "projectConfigurations",
          include: 6
        })
      ])
        .then(([result]) => {
          // return data that should be available
          // in the template
          return {
            projects: result.items
          };
        })
        .catch(console.error);
      const flattenedData = prettify(response.projects);
      this.projectLinks = flattenedData[0].projects;
      // Divide the contentful response by data type
      this.$store.commit("styleStore/setProjectConfigs", this.projectLinks);
    }
  },

  computed: {
    otherProjects() {
      let selectedProjects = [];

      if (this.projectLinks.length > 0) {
        const matchSlug = element => element.slug == this.projectId;
        let foundNum = 0;
        let totalProjectNum = this.projectLinks.length;
        let curProjectIndex = this.projectLinks.findLastIndex(matchSlug);
        let offsetArray = [1, -1, -2];
        offsetArray.forEach(element => {
          let offset = curProjectIndex + element;
          if (offset < 0) offset += totalProjectNum;
          if (offset >= totalProjectNum) offset -= totalProjectNum;
          selectedProjects.push(this.projectLinks[offset]);
        });
      }

      return selectedProjects;
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
