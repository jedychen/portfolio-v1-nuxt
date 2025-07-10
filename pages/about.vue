<template>
  <v-container fluid class="about__container">
    <v-row no-gutters class="about-page mx-lg-16 mx-md-4 mx-sm-2">
      <!-- Page Content -->
      <v-col cols="12" class="page-content-col mt-12 pa-sm-0 pa-xs-0">
        <v-container class="d-flex flex-row pa-sm-0">
          <v-container class="about-page__image py-8 d-none d-md-flex ">
            <v-img
              :src="require(`~/assets/images/${imgSrc(content.photo)}`)"
              :alt="content.photo.title"
              :lazy-src="imgBase64(content.photo)"
              gradient="to right,rgba(0,0,0,0),rgba(0,0,0,0.7)"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="white" />
                </v-row>
              </template>
            </v-img>
          </v-container>
          <v-container
            class="about-page__description mt-16 ml-md-n16 ml-sm-0 pa-sm-0 pa-xs-0"
          >
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
              <div
                class="text-body-1 font-weight-light text-justify"
                v-html="$md.render(this.content.introduction)"
              />
            </div>
          </v-container>
        </v-container>

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
.about-page {
  pointer-events: default;
}

.about-page__image {
  width: 40vw;
}

.about-page__description {
  width: 60vw;
  z-index: 2;
  animation: slide-in 0.5s forwards ease-in-out;
  animation-delay: 0.5s;
  transform: translateX(20%);
  opacity: 0;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    width: 100%;
  }
}

@keyframes slide-in {
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

.intro__title,
.intro__sub-title {
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-xl-screen-lg;
  font-weight: $font-weight-medium;
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
