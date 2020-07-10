<template>
  <v-container
    fluid
    class="about__container"
  >
    <v-row
      no-gutters
      class="about-page"
    >
      <!-- Left Margin -->
      <v-col
        cols="1"
      >
      </v-col>
      <!-- Page Content -->
      <v-col
        cols="10"
        class="page-content-col mt-12"
      >
        <v-row
          no-gutters
          class="mb-12"
        >
          <!-- Introduction. -->
          <v-col
            cols="12"
            md="5"
            class="py-6"
          >
            <p class="text-h6 font-weight-regular text-md-right text-sm-left">
              {{ content.introduction }}
            </p>
          </v-col>
          <v-col
            cols="12"
            md="1"
            class="hidden-xs hidden-sm"
          />

          <!-- Title and Subtitle. -->
          <v-col
            cols="12"
            md="6"
            class="py-6"
          >
            <h1 class="text-h3 intro__title">
              {{ content.title }}
            </h1>

            <h2 class="text-h2 mb-8 intro__sub-title">
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
                  :color="socialLink.color"
                  fab
                  small
                  class="mr-2"
                  :href="socialLink.link"
                  target="_blank"
                  v-bind="attrs" v-on="on"
                >
                  <v-icon>{{ socialLink.iconCode }}</v-icon>
                </v-btn>
              </template>
              <span>{{ socialLink.title }}</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <AboutSection
          v-for="item in contentSectionItems"
          :key="item.title"
          :section="item"
        />

      </v-col>
      <!-- Right Margin -->
      <v-col
        cols="1"
      />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.about__container {
  background-color: black;
}

.intro__title {
  font-family: 'Mayeka-Regular', sans-serif;
  font-weight: 300;
}

.intro__sub-title {
  font-family: 'Mayeka-Regular', sans-serif;
  font-weight: 500;
}

.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}

.page-enter, .page-leave-to {
  opacity: 0;
}
</style>

<script>
import contentful from '@/plugins/contentful.js'
import * as prettify from 'pretty-contentful'
import AboutSection from '@/components/AboutSection'

export default {
  components: {
    AboutSection,
  },

  data() {
    return {
      theme_class: "feature-work__container",
      container: null,
      content: '',
      contentSectionItems: [],
    }
  },

  asyncData ({ params }) {
    return Promise.all([
      // fetch all blog posts sorted by creation date
      contentful.getEntries({
        'content_type': 'aboutPage',
        include: 6,
      })
    ]).then(([result]) => {
      // return data that should be available
      // in the template
      return {
        projects: result.items
      }
    }).catch(console.error)
  },

  computed: {
  },

  watch: {
  },

  beforeMount() {
    this.parseContentful()
  },

  mounted() {
  },

  methods: {
    parseContentful() {
      const flattenedData = prettify(this.projects)
      // Divide the contentful response by data type
      for (let item of flattenedData) {
        this.content = item
        this.contentSectionItems = item.contentSections
        break;
      }
    },
  },
};
</script>
