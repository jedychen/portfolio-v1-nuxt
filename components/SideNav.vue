<template>
  <div v-resize="onResize" class="side-nav__container">
    <div class="side-nav__list-wrapper">
      <v-list flat class="side-nav__list">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(section, i) in sections"
            :id="'side-nav-list-item-' + i"
            :key="i"
            :ripple="false"
            class="side-nav__list-item"
            :class="'waypoint-' + sectionId(section.slug)"
          >
            <v-list-item-content class="align-self-end">
              <v-btn
                :ripple="false"
                text
                @click="
                  $vuetify.goTo(scrollingTarget(section.slug), scrollingOptions)
                "
                class="side-nav__list-item-text align-self-end subtitle-2 side-nav__button"
              >
                {{ section.slug }}
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="side-bar__waypoint-bar" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-nav__container {
  width: 100%;
  pointer-events: none;
  color: black;
  mix-blend-mode: difference;
}

.side-nav__list {
  padding: 0;
  pointer-events: none;
}

.side-nav__list-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  pointer-events: none;
}

.side-nav__list-item {
  padding: 0;
  pointer-events: auto;

  .side-nav__list-item-text-container {
    color: rgba($copy-side-nav, 0.8);
  }

  .side-nav__list-item-text {
    font-weight: $font-weight-light;
    color: rgba($copy-side-nav, 0.8);
    animation: appear 0.5s ease-in 1s;
    animation-fill-mode: both;
    transition: color 0.2s ease-in-out;

    :hover {
      color: rgba($copy-side-nav, 1);
    }
  }

  &.side-nav__list-item-active {
    .side-nav__list-item-text {
      font-weight: $font-weight-medium;
      color: rgba($copy-side-nav, 1);
    }
  }

  .side-nav__button {
    display: inline-block;
  }
}

.side-bar__waypoint-bar {
  height: 100vh;
  background: linear-gradient(
    180deg,
    $theme-grey 30%,
    $theme-orange 55%,
    $theme-yellow 100%
  );
  position: absolute;
  right: 0;
  width: $side-nav-bar-width;
  animation: appear 0.5s ease-in 0.8s;
  animation-fill-mode: both;
}
</style>

<script>
import debounce from "lodash/debounce";

export default {
  name: "SideNav",

  props: {
    sections: {
      default: () => [],
      type: Array
    }
  },

  data() {
    return {
      totalHeight: 0, // Side Nav's total height.
      selector: {
        container: ".side-nav__container",
        list: ".side-nav__list-wrapper",
        itemIdPrefix: "#side-nav-list-item-",
        waypointBar: ".side-bar__waypoint-bar",
        waypoint: ".side-nav__list-item",
        waypointPrefix: ".waypoint-"
      },
      class: {
        waypointActive: "side-nav__list-item-active"
      },
      activeWaypointTitle: ""
    };
  },

  computed: {
    waypointPresentage() {
      return this.$store.getters["waypointStore/getScrollPresentage"];
    },
    sectionNumber() {
      return this.sections.length;
    },
    waypointPosList() {
      return this.$store.getters["waypointStore/getWaypointPosList"];
    },
    activeWaypoint() {
      return this.$store.getters["waypointStore/getActiveWaypoint"];
    },
    waypointPosListUpdated() {
      return this.$store.getters["waypointStore/getWaypointPosListUpdated"];
    },
    scrollingOptions() {
      return {
        container: "#scrolling-content",
        duration: 300,
        offset: 100,
        easing: "easeInOutCubic"
      };
    }
  },

  watch: {
    // Based on current scrolling percentage, set waypoint styles.
    waypointPresentage(value) {
      this.setWaypointBarGradience(value);
    },
    // Update waypoint positions, when loading page or page layout changes.
    waypointPosListUpdated(value) {
      this.setWaypointsStyle();
    },
    activeWaypoint(value) {
      this.setActiveWaypoint(value);
    }
  },

  mounted() {
    let nav_list_wrapper = document.querySelector(this.selector.list);
    let nav_list_col = document.querySelector(this.selector.container);
    // nav_list_wrapper.style.width =
    //   nav_list_col.getBoundingClientRect().width + "px";
    this.setWaypointsStyle();
    this.setFirstWaypointStyle();
    this.calcuTotalHeight();
    this.setWaypointBarGradience(0);
  },

  methods: {
    setFirstWaypointStyle() {
      let nav_item_first = document.querySelector(
        this.selector.itemIdPrefix + "0"
      );
      nav_item_first.classList.add(this.class.waypointActive);
      this.activeWaypointTitle = nav_item_first.className.match(
        /waypoint-(.*) /
      )[1];
    },
    setWaypointsStyle() {
      for (let i = 0; i < this.sections.length; i++) {
        let nav_item = document.querySelector(
          this.selector.itemIdPrefix + i.toString()
        );
        // Set side nav list items' positions.
        nav_item.style.position = "absolute";
        nav_item.style.right = "12px";
        // nav_item.style.width = "100%";
        nav_item.style.top = this.waypointPosList[i] + "vh";
      }
    },
    // Sets the waypoint bar's background color (gradience).
    setWaypointBarGradience(presentage) {
      let waypointBarElem = document.querySelector(this.selector.waypointBar);
      const firstPos = presentage * 100;
      const secondPos = Math.min(presentage * 100 + 10, 100);
      const thirdPos = Math.min(presentage * 100 + 20, 100);
      waypointBarElem.style.background =
        "linear-gradient(180deg, rgba(88, 78, 87, 1) " +
        firstPos +
        "%, rgba(183, 75, 65, 1) " +
        secondPos +
        "%, rgba(248, 136, 38, 1) " +
        thirdPos +
        "%)";
    },
    // Sets the active style to waypoint buttons.
    setActiveWaypoint(waypointTitle) {
      if (waypointTitle != "" && waypointTitle !== this.activeWaypointTitle) {
        let activeWaypointSelector =
          this.selector.waypointPrefix + waypointTitle;
        let prevWaypointSelector =
          this.selector.waypointPrefix + this.activeWaypointTitle;
        let nav_item_active = document.querySelector(
          this.selector.waypoint + activeWaypointSelector
        );
        let nav_item_prev = document.querySelector(
          this.selector.waypoint + prevWaypointSelector
        );
        if (nav_item_active) {
          nav_item_active.classList.add(this.class.waypointActive);
          if (nav_item_prev)
            nav_item_prev.classList.remove(this.class.waypointActive);
          this.activeWaypointTitle = waypointTitle;
        }
      }
    },
    // Calculate total height of the full page.
    calcuTotalHeight() {
      this.totalHeight = document
        .querySelector(this.selector.list)
        .getBoundingClientRect().height;
    },
    onResize: debounce(function() {
      this.calcuTotalHeight();
      this.setActiveWaypoint(this.activeWaypoint);
    }, 100),
    // Calculate total height of the full page.
    sectionId(title) {
      return title
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-");
    },
    scrollingTarget(title) {
      return "#" + this.sectionId(title);
    }
  }
};
</script>
