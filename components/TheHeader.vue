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

    <v-toolbar-items>
      <v-btn icon>
        <nuxt-link to="/">
          Work
        </nuxt-link>
      </v-btn>
      <v-divider
        class="mx-4"
        vertical
      />
      <v-btn icon>
        <nuxt-link to="/about">
          About
        </nuxt-link>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style scoped>
  .header__title {
    color: #fff;
    font-family: 'Mayeka-Light', sans-serif;
    font-size: 30px;
    letter-spacing: 0.1rem;
    margin-left: 20px;
    white-space: nowrap;
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
};
</script>
