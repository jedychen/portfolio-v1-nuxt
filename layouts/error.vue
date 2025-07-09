<template>
  <v-app dark>
    <div class="error-page">
      <div class="error-page__block mb-12">
        <h1 v-if="error.statusCode === 404" class="error-page__title mx-8 mb-4">
          {{ pageNotFound }} &#128575;
        </h1>
        <h1 v-else class="error-page__title mx-8 mb-4">{{ otherError }}</h1>
        <NuxtLink to="/" class="text-h5 mx-8">
          Go back to the home page
        </NuxtLink>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "Sorry, the page is not found.",
      otherError: "Sorry, something goes wrong..."
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style lang="scss" scoped>
.error-page__title {
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-xl-screen-lg;
  font-weight: $font-weight-regular;
}

.error-page {
  align-items: center;
  display: flex;
  height: 100%;
}

.error-page__block {
  display: block;
  width: 100%;
}
</style>
