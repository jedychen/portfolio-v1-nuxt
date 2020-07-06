<template>
  <v-row
    no-gutters
  >
    <v-col
      cols="12"
      class="px-7"
    >
      <h1 class="mb-4 intro-section__title">
        {{ content.title }}
      </h1>
    </v-col>
    <v-col
      cols="12"
      md="4"
      class="pa-6"
    >
      
      <v-chip
        v-for="(tag, i) in content.tags"
        :key="i"
        outlined
        class="ma-1"
        color="primary"
      >
        {{ tag }}
      </v-chip>
      <p class="text-h5 font-weight-light ml-1 mt-8">
        {{ content.date }}
      </p>
    </v-col>
    <v-col
      cols="12"
      md="8"
      class="pa-6"
    >
      <InlineVideo :content="content.media" />
      <p class="text-h6 font-weight-regular content__text mt-6">
        {{ content.description }}
      </p>
    </v-col>
    <v-col
      cols="12"
      class="pa-6"
    >
      <v-divider 
        color="white"
      />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.intro-section__title {
  font-family: 'Mayeka-Regular', sans-serif;
  font-size: 72px;
  font-weight: 400;
}

.content__text {
  line-height: 1.5em;
}

</style>

<script>
import InlineVideo from '@/components/InlineVideo';

export default {
  name: 'IntroSection',

  components: {
    InlineVideo,
  },

  props: {
    content: {
      default: null,
      type: Object
    },
  },

  data () {
    return {}
  },
}
</script>
