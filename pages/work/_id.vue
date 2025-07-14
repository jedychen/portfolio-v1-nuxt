<template>
  <v-container fluid class="project-page__container">
    <v-row no-gutters>
      <v-col cols="12" order="2">
        <v-row
          v-scroll:#scrolling-content="onScroll"
          class="project-page mt-12 mx-lg-16 mx-md-4 mx-sm-2"
        >
          <!-- Page Content -->
          <v-col v-resize="onResize" cols="12" class="page-content-col">
            <ContentSection
              v-for="item in contentSectionItems"
              :key="item.title"
              :section="item"
              v-intersect="onIntersect"
              class="content-section-container"
              @ready="calcuPageLength"
            />
          </v-col>
          <!-- Side Nav / Left Margin -->
          <v-col cols="1" class="side-nav-col d-none d-md-flex">
            <SideNav :sections="contentSectionItems" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" order="1" class="intro-section-col">
        <IntroSection :content="introSectionItem" @ready="calcuPageLength" />
      </v-col>
      <v-col cols="12" order="3" class="up-next-section-col">
        <UpNextSection :projectId="projectId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
body::-webkit-scrollbar {
  width: 1em;
}

.project-page__container {
  cursor: default;
}

.intro-section-col,
.up-next-section-col {
  background-color: $neutral-black;
  position: relative;
}

.page-content-col {
  animation: appear 0.5s ease-in 0.8s;
  animation-fill-mode: both;
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
import debounce from "lodash/debounce";
import SideNav from "@/components/SideNav";
import IntroSection from "@/components/sections/IntroSection";
import ContentSection from "@/components/contentStructure/ContentSection";
import UpNextSection from "@/components/sections/UpNextSection";

export default {
  // Jedy: Password Disabled
  // middleware: ["password-protect"],

  head() {
    return {
      title: this.introSectionItem.title,
      meta: [
        {
          hid: "Featured Work" + this.introSectionItem.title,
          name: "Work Page",
          content: "Details about the work" + this.introSectionItem.title
        }
      ]
    };
  },

  components: {
    SideNav,
    IntroSection,
    ContentSection,
    UpNextSection
  },

  data() {
    return {
      pageLength: 0, // Page's total length.
      scrollTop: 0, // Scrolling distance to top.
      sideNavWaypointOffset: 50,
      activeWaypointTitle: ""
    };
  },

  async asyncData({ store, route }) {
    const response = await store.getters["contentfulStore/getProjectPage"](
      route.params.id
    );
    if (response.slug == route.params.id) {
      return {
        projectId: response.slug,
        introSectionItem: response.introSection,
        contentSectionItems: response.contentSections
      };
    }
    return {
      introSectionItem: {},
      contentSectionItems: [],
      projectId: ""
    };
  },

  async mounted() {
    this.calcuPageLength();
  },

  methods: {
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      const title = entries[0].target.querySelector(".content-section__title")
        .id;
      if (entries[0].isIntersecting && title != this.activeWaypointTitle) {
        this.activeWaypointTitle = title;
        this.$store.commit("waypointStore/setActiveWaypoint", title);
      }
    },
    calcuPageLength() {
      const contentCol = document.querySelector(".page-content-col");
      if (contentCol != null) this.pageLength = contentCol.offsetHeight;
      this.calcuWaypointsPosition();
    },
    calcuWaypointsPosition() {
      const sections = document.querySelectorAll(".content-section-container");
      let vhPrevPos = 0;
      let minGap = 5; // 5 percent of
      sections.forEach((item, index) => {
        let offsetTop = item.offsetTop;
        let vhPos = Math.min((offsetTop * 100) / this.pageLength, 85);
        this.$store.commit("waypointStore/setWaypoint", {
          index: index,
          vhPos: Math.max(vhPos, vhPrevPos + minGap) //ensure two buttons' gap is more than min value
        });
        vhPrevPos = vhPos;
      });
    },
    onResize: debounce(function() {
      this.calcuPageLength();
    }, 100),
    // Get the presentatge of current scrolling content.
    onScroll(e) {
      this.scrollTop = e.target.scrollTop;
      let presentage = this.scrollTop / (this.pageLength - window.innerHeight);
      presentage = this.clamp(presentage, 0, 1);
      this.$store.commit("waypointStore/setScrollPresentage", presentage);
    },
    clamp(num, min, max) {
      return num <= min ? min : num >= max ? max : num;
    }
  }
};
</script>
