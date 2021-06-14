<template>
  <v-app dark>
    <div class="error-page">
      <div class="error-page__block mb-12">
        <h1 v-if="error.statusCode === 404" class="text-h2 mx-8 mb-4">
          {{ pageNotFound }} &#128575;
        </h1>
        <h1 v-else class="text-h2 mx-8 mb-4">{{ otherError }} &#129488;</h1>
        <NuxtLink to="/" class="text-h4 mx-8">
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
      otherError: "Sorry, an error occurred."
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
