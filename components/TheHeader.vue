<template>
  <v-app-bar
    absolute
    :scroll-target="contentId"
    class="header-bar header-bar__bg"
  >
    <v-row no-gutters>
      <v-col cols="12">
        <v-row class="ml-lg-16 mr-lg-11 ml-md-4 mr-md-0 ml-sm-2">
          <v-col cols="6" sm="6" md="4" align-self="center">
            <nuxt-link to="/" class="header__link">
              <v-toolbar-title class="header__title d-none d-sm-flex">
                JEDY CHEN
              </v-toolbar-title>
              <v-toolbar-title class="header__title d-xs-flex d-sm-none">
                JEDY
              </v-toolbar-title>
            </nuxt-link>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" sm="4" md="3" lg="2" align-self="center">
            <nuxt-link
              to="/about"
              exact
              exact-active-class="header-link--active"
              class="header-link"
            >
              <v-btn text nuxt :ripple="false" class="font-weight-light">
                About
              </v-btn>
            </nuxt-link>
            <nuxt-link
              to="/"
              exact
              exact-active-class="header-link--active"
              :class="{
                'header-link--active nuxt-link-active': isRouteActive('work')
              }"
              class="header-link"
            >
              <v-btn text nuxt :ripple="false" class="font-weight-light">
                Work
              </v-btn>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.header-bar.header-bar__bg.v-toolbar.v-sheet {
  background-color: rgba($color: $neutral-black, $alpha: 0.9);
  z-index: 3; // To be above the intro-section__title
}

a.header__link {
  text-decoration: none;

  &:hover {
    .header__title {
      color: $neutral-grey-c;
    }
  }
}

.header-link {
  float: right;
}

.header__title {
  font-family: "Futura-Light", sans-serif;
  font-size: 24px;
  letter-spacing: 0.2rem;
  white-space: nowrap;
  color: $neutral-white;
}

.header-link {
  color: rgba($color: $neutral-white, $alpha: 0);
  transition: color 0.3s;

  &.header-link--active {
    color: $neutral-white;
  }

  .v-btn {
    color: $neutral-white;
  }
}
</style>

<script>
export default {
  name: "TheHeader",

  props: {
    id: {
      default: "",
      type: String
    }
  },

  data() {
    return {
      contentId: this.id
    };
  },

  methods: {
    isRouteActive(id) {
      if (this.$route.path.includes(id)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
