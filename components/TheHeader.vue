<template>
  <v-app-bar
    absolute
    color="secondary"
    hide-on-scroll
    short
    :scroll-target="contentId"
  >
    <nuxt-link
      to="/"
      class="header__link"
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
    </nuxt-link>

    <v-spacer />

    <nuxt-link
      to="/"
      exact
      exact-active-class="header-link--active"
      :class="{
        'header-link--active nuxt-link-active': isRouteActive('work'),
      }"
      class="header-link"
    >
      <v-btn
        text
        nuxt
        :ripple="false"
      >
        Work
      </v-btn>
    </nuxt-link>

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
a.header__link {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.header__title {
  font-family: 'Mayeka-Light', sans-serif;
  font-size: 30px;
  letter-spacing: 0.1rem;
  margin-left: 20px;
  white-space: nowrap;
  color: $copy-color-light-grey;
}

.header-link {
  color: rgba($color: $copy-color, $alpha: 0);
  transition: color .3s;

  &.header-link--active {
    color: $theme-yellow;
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
