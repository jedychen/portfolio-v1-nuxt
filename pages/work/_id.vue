<template>
  <v-container
    fluid
    class="project-page__container"
  >
    <v-row
      v-scroll:#scrolling-content="onScroll"
      no-gutters
      class="project-page"
    >
      <!-- Side Nav -->
      <v-col
        cols="1"
        lg="2"
        class="side-nav-col hidden-md hidden-xs"
      >
        <SideNav
          :sections="contentSectionItems"
        />
      </v-col>
      <!-- Page Content -->
      <v-col
        v-resize="onResize"
        cols="12"
        sm="10"
        md="12"
        lg="10"
        class="page-content-col mt-12"
      >
        <IntroSection :content="introSectionItem" />
        <ContentSection
          v-for="item in contentSectionItems"
          :key="item.title"
          :section="item"
          class="content-section-container"
          @ready="calcuPageLength"
        />
        <UpNextSection :content="upNextSectionItems" />
      </v-col>
      <!-- Right Margin -->
      <v-col
        cols="1"
        class="margin-col hidden-md hidden-xs"
      />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.project-page__container,
.project-page {
  background: black;
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
import debounce from 'lodash/debounce'
import SideNav from '@/components/SideNav'
import IntroSection from '@/components/IntroSection'
import ContentSection from '@/components/ContentSection'
import UpNextSection from '@/components/UpNextSection'

export default {
  middleware: ['password-protect'],

  components: {
    SideNav,
    IntroSection,
    ContentSection,
    UpNextSection,
  },

  data () {
    return {
      pageLength: 0, // Page's total length.
      scrollTop: 0, // Scrolling distance to top.
      introSectionItem: {},
      contentSectionItems: [],
      upNextSectionItems: [],
      sideNavWaypointOffset: 50,
    }
  },

  asyncData ({ params }) {
    return Promise.all([
      // fetch all blog posts sorted by creation date
      contentful.getEntries({
        'content_type': 'projectPage',
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

  mounted() {
    this.calcuPageLength()
  },

  methods: {
    calcuPageLength() {
      const contentCol = document.querySelector(".page-content-col")
      if (contentCol != null)
        this.pageLength = contentCol.offsetHeight
      this.calcuWaypoints()
    },
    calcuWaypoints() {
      const sections = document.querySelectorAll(".content-section-container")
      sections.forEach((item, index) => {
        let offsetTop = item.offsetTop
        let vhPos = Math.floor((offsetTop - this.sideNavWaypointOffset) * 100 / this.pageLength)
        this.$store.commit('waypointStore/setWaypoint', {index: index, vhPos: vhPos})
      });
    },
    onResize: debounce(function(){
      this.calcuPageLength()
    }, 100),
    onScroll(e) {
      this.scrollTop = e.target.scrollTop;
      let presentage = this.scrollTop / (this.pageLength - window.innerHeight)
      presentage = this.clamp(presentage, 0, 1)
      this.$store.commit('waypointStore/setScrollPresentage', presentage)
    },
    clamp(num, min, max) {
      return num <= min ? min : num >= max ? max : num
    },
    parseContentful() {
      const flattenedData = prettify(this.projects)
      // Divide the contentful response by data type
      for (let item of flattenedData) {
        if (item.slug == this.$route.params.id) {
          this.introSectionItem = item.introSection
          this.contentSectionItems = item.contentSections
          this.upNextSectionItems = item.otherWork
          break;
        }
      }
    },
  },
};
</script>
