<template>
  <v-app-bar
    absolute
    color="white"
    hide-on-scroll
    short
    :scroll-target="contentId"
    class="header-bar"
  >
    <v-row no-gutters>
      <v-col cols="4" sm="6" md="4" align-self="center">
        <nuxt-link to="/" class="header__link">
          <v-toolbar-title class="header__title d-none d-sm-flex">
            Jedy Chen
          </v-toolbar-title>
          <v-toolbar-title class="header__title d-xs-flex d-sm-none">
            Jedy
          </v-toolbar-title>
        </nuxt-link>
      </v-col>
      <v-col cols="2" sm="2" md="5" lg="6" class="d-none d-sm-flex" />
      <v-col cols="8" sm="4" md="3" lg="2" align-self="center">
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
  </v-app-bar>
</template>

<style lang="scss" scoped>
a.header__link {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
}

.header-link {
  float: right;
}

.header__title {
  font-family: "Mayeka-Light", sans-serif;
  font-size: 30px;
  letter-spacing: 0.2rem;
  margin-left: 20px;
  white-space: nowrap;
  color: $neutral-grey-a;

  @include bp(xs) {
    font-size: 16px;
  }
}

.header-link {
  color: rgba($color: $neutral-black, $alpha: 0);
  transition: color 0.3s;

  &.header-link--active {
    color: $theme-yellow;
  }

  .v-btn {
    color: $neutral-black;
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
