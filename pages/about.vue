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
          <!-- Title and Subtitle. -->
          <v-col
            cols="12"
            md="6"
            class="py-6"
            order="md-3"
          >
            <h1 class="text-h3 intro__title">
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
                  v-bind="attrs" v-on="on"
                >
                  <v-icon>{{ socialLink.iconCode }}</v-icon>
                </v-btn>
              </template>
              <span>{{ socialLink.title }}</span>
            </v-tooltip>
            
          </v-col>

          <v-col
            cols="12"
            md="1"
            class="hidden-xs hidden-sm"
            order="md-2"
          />
        
          <!-- Introduction. -->
          <v-col
            cols="12"
            md="5"
            class="py-6"
            order="md-1"
          >
            <p class="text-h6 font-weight-regular">
              {{ content.introduction }}
            </p>
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
.intro__tag {
  color: $theme-orange;
}

.intro__title {
}

.intro__sub-title {
  font-family: 'Mayeka-Regular', sans-serif;
  font-size: 4.5rem;
  font-weight: 400;
  line-height: 1.1em;
  @include bp(sm){
    font-size: 3rem;
  }
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

  head() {
    return {
      title: 'About',
      meta: [
        {
          hid: 'About Jedy Chen',
          name: 'About Page',
          content: 'About my experience and skills.'
        }
      ]
    }
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

  beforeMount() {
    this.parseContentful()
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
