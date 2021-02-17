<template>
  <v-container
    fluid
    class="project-page__container"
  >
    <v-row
      v-scroll:#scrolling-content="onScroll"
      no-gutters
      class="project-page mt-12"
    >
      <!-- Side Nav / Left Margin -->
      <v-col
        cols="1"
        lg="2"
        class="side-nav-col hidden-xs"
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
        lg="9"
        class="page-content-col"
      >
        <IntroSection
          :content="introSectionItem"
          @ready="calcuPageLength"
        />
        <ContentSection
          v-for="item in contentSectionItems"
          :key="item.title"
          :section="item"
          v-intersect="onIntersect"
          class="content-section-container"
          @ready="calcuPageLength"
        />
        <UpNextSection :content="upNextSectionItems" />
      </v-col>
      <!-- Right Margin -->
      <v-col
        cols="1"
        class="margin-col hidden-xs"
      />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@keyframes appear {
  from {opacity: 0;}
  to {opacity: 1;}
}

.page-content-col {
  animation: appear .5s ease-in 0.8s;
  animation-fill-mode: both;
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
import ContentSection from '@/components/contentStructure/ContentSection'
import UpNextSection from '@/components/UpNextSection'

export default {
  middleware: ['password-protect'],

  head() {
    return {
      title: this.introSectionItem.title,
      meta: [
        {
          hid: 'Featured Work' + this.introSectionItem.title,
          name: 'Work Page',
          content: 'Details about the work' + this.introSectionItem.title
        }
      ]
    }
  },

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
      activeWaypointTitle: '',
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
    onIntersect (entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      const title = entries[0].target.querySelector('.content-section__title').id
      if (entries[0].isIntersecting && title != this.activeWaypointTitle) {
        this.activeWaypointTitle = title
        this.$store.commit('waypointStore/setActiveWaypoint', title)
      }
    },
    calcuPageLength() {
      const contentCol = document.querySelector(".page-content-col")
      if (contentCol != null)
        this.pageLength = contentCol.offsetHeight
      this.calcuWaypointsPosition()
    },
    calcuWaypointsPosition() {
      const sections = document.querySelectorAll(".content-section-container")
      sections.forEach((item, index) => {
        let offsetTop = item.offsetTop
        let vhPos = Math.min((offsetTop) * 100 / this.pageLength, 85)
        this.$store.commit('waypointStore/setWaypoint', {index: index, vhPos: vhPos})
      });
    },
    onResize: debounce(function(){
      this.calcuPageLength()
    }, 100),
    // Get the presentatge of current scrolling content.
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
