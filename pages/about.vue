<template>
  <v-container fluid class="about__container">
    <v-row no-gutters class="about-page mx-lg-16 mx-md-4 mx-sm-2">
      <!-- Page Content -->
      <v-col cols="12" class="page-content-col mt-12">
        <v-row no-gutters class="mb-12">
          <v-col cols="12" md="5" class="py-8 d-none d-md-flex">
            <v-img
              :src="require(`~/assets/images/${imgSrc(content.photo)}`)"
              :alt="content.photo.title"
              :lazy-src="imgBase64(content.photo)"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary" />
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" md="6" lg="6" class="offset-md-1">
            <!-- Title and Subtitle. -->
            <div class="py-6">
              <h1 class="intro__title">
                <span class="intro__tag">
                  {{ content.title }}
                </span>
              </h1>

              <h2 class="mb-8 intro__sub-title">
                {{ content.subtitle }}
              </h2>

              <!-- Social Links. -->
              <v-tooltip
                bottom
                v-for="socialLink in content.socialLinks"
                :key="socialLink.title"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    class="mr-2"
                    :href="socialLink.link"
                    target="_blank"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>{{ socialLink.iconCode }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ socialLink.title }}</span>
              </v-tooltip>
            </div>

            <!-- Introduction. -->
            <div class="py-6">
              <div class="text-h8 font-weight-light text-justify">
                {{ content.introduction }}
              </div>
            </div>
          </v-col>
        </v-row>

        <AboutSection
          v-for="item in contentSectionItems"
          :key="item.title"
          :section="item"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables"; // For breakpoint specific styles

.about__photo {
  width: 30vw;
}

.intro__title,
.intro__sub-title {
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-xl-screen-lg;
  font-weight: 500;
  line-height: $line-height-sm;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    font-size: $font-size-xl-screen-sm;
  }
}

.intro__tag {
  color: $theme-orange;
}

.intro__sub-title {
  font-family: "Futura-Book", sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>

<script>
import contentful from "@/plugins/contentful.js";
import * as prettify from "pretty-contentful";
import AboutSection from "@/components/sections/AboutSection";
import imageUtils from "../assets/js/imageUtils";

export default {
  components: {
    AboutSection
  },

  head() {
    return {
      title: "About",
      meta: [
        {
          hid: "About Jedy Chen",
          name: "About Page",
          content: "About my experience and skills."
        }
      ]
    };
  },

  data() {
    return {
      theme_class: "feature-work__container",
      container: null,
      content: "",
      contentSectionItems: []
    };
  },

  asyncData({ params }) {
    return Promise.all([
      // fetch all blog posts sorted by creation date
      contentful.getEntries({
        content_type: "aboutPage",
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
  },

  beforeMount() {
    this.parseContentful();
  },

  methods: {
    parseContentful() {
      const flattenedData = prettify(this.projects);
      // Divide the contentful response by data type
      for (let item of flattenedData) {
        this.content = item;
        this.contentSectionItems = item.contentSections;
        break;
      }
    },
    imgSrc(image) {
      return imageUtils.imgSrc(image);
    },
    imgBase64(image) {
      return imageUtils.imgBase64(image);
    }
  }
};
</script>
