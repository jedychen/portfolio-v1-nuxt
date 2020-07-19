<template>
  <div
    v-resize="onResize"
    class="side-nav__container"
  >
    <v-row
      no-gutters
      class="side-nav__list-wrapper hidden-md-and-down"
    >
      <v-col
        cols="7"
      >
        <v-list
          flat
          class="side-nav__list mt-12"
        >
          <v-list-item-group
            color="primary"
          >
            <v-list-item
              v-for="(section, i) in sections"
              :id="'side-nav-list-item-'+i"
              :key="i"
              :ripple="false"
              class="side-nav__list-item"
            >
              <v-list-item-content>
                <v-btn
                  :ripple="false"
                  text
                  @click="$vuetify.goTo(scrollingTarget(section.slug), scrollingOptions)"
                  class="side-nav__list-item-text subtitle-2 side-nav__button"
                
                >
                  {{ section.slug }}
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col
        cols="5"
        class="side-bar__divide-line"
      >
        <div class="side-bar__waypoint-bar" />
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
@keyframes appear {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes extend {
  from {height: 0;}
  to {height: 100vh;}
}

.side-nav__container {
  width: 100%;
}

.side-nav__list-wrapper {
  position: fixed;
  top: 0;
  height: 100vh;
}

.side-bar__divide-line {
  animation: extend .3s ease-in 0.5s;
  animation-fill-mode: both;
}

.side-nav__list-item {
  .side-nav__list-item-text {
    font-weight: 300;
    color: $theme-grey;
    animation: appear .5s ease-in 1.3s;
    animation-fill-mode: both;
  }

  &.side-nav__list-item-active {
    .side-nav__list-item-text {
      font-weight: 500;
      color: $theme-yellow;
    }
  }

  .side-nav__button {
    display: inline-block;
    white-space: normal;
  }
}

.side-bar__waypoint-bar {
  height: 100vh;
  background: linear-gradient(180deg, rgba(88, 78, 87, 1) 30%, rgba(183, 75, 65, 1) 55%, rgba(248, 136, 38, 1) 100%);
  position: absolute;
  width: 4px;
  animation: appear .5s ease-in 0.8s;
  animation-fill-mode: both;
}
</style>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'SideNav',

  props: {
    sections: {
      default: () => [],
      type: Array
    },
  },

  data () {
    return {
      totalHeight: 0, // Side Nav's total height.
      selector: {
        container: '.side-nav__container',
        list: '.side-nav__list-wrapper',
        itemIdPrefix: '#side-nav-list-item-',
        waypointBar: '.side-bar__waypoint-bar',
      },
    }
  },

  computed: {
    waypointPresentage() {
      return this.$store.getters['waypointStore/getScrollPresentage'];
    },
    sectionNumber() {
      return this.sections.length
    },
    waypointPosList() {
      return this.$store.getters['waypointStore/getWaypointPosList'];
    },
    waypointPosListUpdated() {
      return this.$store.getters['waypointStore/getWaypointPosListUpdated'];
    },
    scrollingOptions() {
      return {
        container: '#scrolling-content',
        duration: 300,
        offset: 200,
        easing: 'easeInOutCubic',
      }
    },
  },

  watch: {
    // Based on current scrolling percentage, set waypoint styles.
    waypointPresentage(value) {
      this.setWaypointBarPos(value);
      this.setActiveLink(value);
    },
    // Update waypoint positions, when loading page or page layout changes.
    waypointPosListUpdated(value) {
      this.setWaypointSectionStyle(false);
    },
  },

  mounted() {
    let nav_list_wrapper = document.querySelector(this.selector.list);
    let nav_list_col = document.querySelector(this.selector.container);
    nav_list_wrapper.style.width = nav_list_col.getBoundingClientRect().width + "px";
    this.setWaypointSectionStyle(true);
    this.calcuTotalHeight();
    this.setWaypointBarPos(0);
  },

  methods: {
    setWaypointSectionStyle(initialize=false) {
      for(let i=0; i<this.sections.length; i++) {
        let nav_item = document.querySelector(this.selector.itemIdPrefix + i.toString());
        if (i==0 && initialize) {
          nav_item.classList.add("side-nav__list-item-active");
        }
        // Set side nav list items' positions.
        nav_item.style.position = "absolute";
        nav_item.style.width = "100%";
        nav_item.style.top = this.waypointPosList[i] + "vh";
      }
    },
    // Sets the waypoint bar's background color (gradience).
    setWaypointBarPos(presentage) {
      let waypointBarElem = document.querySelector(this.selector.waypointBar);
      const firstPos = presentage * 100
      const secondPos = Math.min(presentage * 100 + 10, 100)
      const thirdPos = Math.min(presentage * 100 + 20, 100)
      waypointBarElem.style.background = "linear-gradient(180deg, rgba(88, 78, 87, 1) " + firstPos + "%, rgba(183, 75, 65, 1) "
          + secondPos +"%, rgba(248, 136, 38, 1) " + thirdPos + "%)";
    },
    // Sets the active style to waypoint buttons.
    setActiveLink(presentage) {
      let num = 0;
      for(let i=0; i<this.sections.length; i++) {
        let nav_item = document.querySelector(this.selector.itemIdPrefix + i.toString());
        let current_nav_item_offset = nav_item.getBoundingClientRect().top;
        if (current_nav_item_offset/window.innerHeight < presentage)
          num = i;
        nav_item.classList.remove("side-nav__list-item-active");
      }
      let nav_item = document.querySelector(this.selector.itemIdPrefix + (num).toString());
      nav_item.classList.add("side-nav__list-item-active");
    },
    calcuTotalHeight() {
      this.totalHeight = document.querySelector(
          this.selector.list).getBoundingClientRect().height;
    },
    onResize: debounce(function(){
      this.calcuTotalHeight();
      this.setActiveLink();
    }, 100),
    scrollingTarget(title) {
      return '#' + title.toLowerCase().trim().split(' ').join('-')
    },
  },
};
</script>
