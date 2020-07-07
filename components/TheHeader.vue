<template>
  <v-app-bar
    absolute
    color="grey darken-3"
    hide-on-scroll
    short
    :scroll-target="contentId"
  >
    <v-toolbar-title
      class="header__title hidden-xs-only"
    >
      Jedy Chen
    </v-toolbar-title>
    <v-toolbar-title
      class="header__title hidden-sm-and-up"
    >
      Jedy
    </v-toolbar-title>

    <v-spacer />

    <nuxt-link
      to="/"
      exact
      exact-active-class="header-link--active"
      :class="{
        'header-link header-link--active nuxt-link-active': isRouteActive('work'),
        'header-link': !isRouteActive('work'),
      }"
    >
      <v-btn
        text
        nuxt
        :ripple="false"
      >
        Work
      </v-btn>
    </nuxt-link>

    <!-- <v-divider
      class="mx-4"
      vertical
    /> -->

    <nuxt-link
      to="/about"
      exact
      exact-active-class="header-link--active"
      class="header-link"
    >
      <v-btn
        text
        nuxt
        :ripple="false"
      >
        About
      </v-btn>
    </nuxt-link>
  </v-app-bar>
</template>

<style lang="scss" scoped>
  .header__title {
    color: white;
    font-family: 'Mayeka-Light', sans-serif;
    font-size: 30px;
    letter-spacing: 0.1rem;
    margin-left: 20px;
    white-space: nowrap;
  }

  .header-link {
    color: rgba($color: white, $alpha: 0);
    transition: color .3s;

    &.header-link--active {
      color: white;
    }
  }
</style>

<script>
export default {
  name: 'TheHeader',

  props: {
    id: {
      default: '',
      type: String
    }
  },

  data() {
    return {
      contentId: this.id,
    }
  },

  methods: {
    isRouteActive(id) {
      if (this.$route.path.includes(id)) {
        return true
      } else {
        return false
      }
    },
  }
};
</script>
