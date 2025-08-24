<template>
  <div class="feature-work__container mt-16" ref="container">
    <v-row no-gutters>
      <v-col
        cols="12"
        md="4"
        sm="6"
        v-for="(link, i) in projectLinks"
        :key="'project link' + i"
      >
        <NuxtLink :to="'/work/' + link.slug">
          <v-row no-gutters>
            <v-col cols="4" v-for="index in 6" :key="index + link.title">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div
                    class="flip-card-front flip-card_cover-image"
                    :style="
                      'background-image: url(' +
                        getImageSrc(link) +
                        '); background-position:' +
                        ((index - 1) % 3) * 50 +
                        '% ' +
                        Math.floor((index - 1) / 3) * 100 +
                        '%;'
                    "
                  ></div>
                  <div
                    class="flip-card-back pl-4 pt-4"
                    :style="'background-color:' + getThemeColor(link) + ';'"
                  >
                    <h5 class="flip-card-back_title">
                      {{ parseKeywordTitle(link.keyWords[index - 1]) }}
                    </h5>
                    <p
                      class="flip-card-back_content"
                      v-for="description in parseKeywordContent(
                        link.keyWords[index - 1]
                      )"
                      :key="description"
                    >
                      {{ description }}
                    </p>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </NuxtLink>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables"; // For breakpoint specific styles

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    width: 11.11111vw;
    height: 11.11111vw;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    width: 16.66666vw;
    height: 16.66666vw;
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    width: 33.33333vw;
    height: 33.33333vw;
  }
}

.flip-card_cover-image {
  background-size: cover;
  background-size: 300% 200%;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateX(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  text-align: left;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  color: white;
  transform: rotateX(180deg);
}

.flip-card-back_title {
  font-family: $body-font-family, sans-serif;
  font-size: 14px;
  margin-bottom: 4px;
}

.flip-card-back_content {
  font-family: $body-font-family, sans-serif;
  font-size: 16px;
  padding: 0;
  margin: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
  transition-timing-function: ease-in-out;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>

<script>
import imageUtils from "../assets/js/imageUtils";
export default {
  head() {
    return {
      title: "Jedy Chen",
      meta: [
        {
          hid: "Home Page of JedyChen.com",
          name: "Home Page",
          content: "A collection of Jedy's featured work."
        }
      ]
    };
  },

  data() {
    return {
      theme_class: "feature-work__container",
      container: null,
      projectLinks: [] // To hold contentful project data
    };
  },

  computed: {},

  watch: {
    clickedProject(value) {
      if (value != "") {
        this.container.classList.add("project-clicked");
        this.$router.push({ path: `/work/${value}` });
      }
    }
  },

  async mounted() {
    this.projectLinks = await this.$store.getters[
      "contentfulStore/getProjectConfigurations"
    ];
  },

  methods: {
    getImageSrc(link) {
      return imageUtils.imgSrcCover(link.coverImage);
    },
    getThemeColor(link) {
      return link.themeColor;
    },
    parseKeywordTitle(keyword) {
      const contentArray = keyword.split(":");
      if (contentArray.length > 1) {
        return contentArray[0];
      }
      return "";
    },
    parseKeywordContent(keyword) {
      const contentArray = keyword.split(":");
      if (contentArray.length > 1) {
        let title = contentArray[0];
        return keyword.replace(title + ":", "").split(",");
      }
      return keyword.split(",");
    }
  }
};
</script>
