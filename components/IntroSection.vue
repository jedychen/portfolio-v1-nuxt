<template>
  <v-row
    no-gutters
  >
    <!-- title -->
    <v-col
      cols="12"
      md="8"
    >
      <h1 class="my-12 intro-section__title">
        {{ content.title }}
      </h1>
    </v-col>

    <!-- date -->
    <v-col
      cols="12"
      md="4"
      class="date-wrapper"
    >
      <p class="text-h4 font-weight-light mx-4 mb-md-12 date-content">
        {{ content.date }}
      </p>
    </v-col>

    <!-- video -->
    <v-col
      v-if="content.media"
      cols="12"
      md="8"
    >
      <ContentComponent
        :component="content.media"
        @ready="childReady"
      />
    </v-col>

    <!-- copy and tags -->
    <v-col
      cols="12"
      md="4"
    >
      <p class="text-subtitle-1 mx-4 font-weight-regular content__text">
        {{ content.description }}
      </p>

      <div
        v-if="content.tags"
        class="my-8 mx-2"
      >
        <v-chip
          v-for="(tag, i) in content.tags"
          :key="'project main tag' + i"
          class="ma-1"
          color="secondary"
        >
          {{ tag }}
        </v-chip>
      </div>
    </v-col>
    
    <!-- divider -->
    <v-col
      cols="12"
    >
      <v-divider
        class="secondary mt-4"
      />
    </v-col>
    
  </v-row>
</template>

<style lang="scss" scoped>
.intro-section__title {
  font-family: 'CantataOne-Regular', serif;
  font-size: 5rem;
  font-weight: 400;
  line-height: 1.0em;
}

.date-wrapper {
  position: relative;
}

.date-content {
  position: absolute;
  bottom: 0;
  color: $copy-color-med-grey;
}

.content__text {
  line-height: 1.5em;
}
</style>

<script>
import ContentComponent from '@/components/contentStructure/ContentComponent';

export default {
  name: 'IntroSection',

  components: {
    ContentComponent,
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

  methods: {
    childReady() {
      this.$emit("ready");
    }
  },
}
</script>
