<template>
  <v-row class="mt-12 intro-section">
    <!-- title -->
    <v-col cols="12" sm="10" class="offset-sm-1">
      <v-row>
        <v-col cols="12">
          <p
            v-if="content.subtitle"
            class="text-h4 font-weight-light mt-2 ml-1"
          >
            {{ content.subtitle }}
          </p>
          <h1 class="intro-section__title mb-7">
            {{ content.title }}
          </h1>
          <div v-if="content.tags" class="mr-2">
            <v-chip
              v-for="(tag, i) in content.tags"
              :key="'project main tag' + i"
              class="mr-1 mb-2 tag-text"
              color="neutral-grey-c"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-col>

        <!-- video -->
        <v-col v-if="content.media" cols="12">
          <ContentComponent :component="content.media" @ready="childReady" />
        </v-col>

        <!-- date -->
        <v-col cols="12" md="4" class="date-wrapper">
          <p class="text-h4 font-weight-thin">
            {{ content.date }}
          </p>
        </v-col>

        <!-- copy -->
        <v-col cols="12" md="8">
          <p class="text-body-1 font-weight-regular content__text">
            {{ content.description }}
          </p>
        </v-col>
      </v-row>
    </v-col>
    <!-- divider -->
    <v-col cols="12">
      <v-divider class="secondary mt-4" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.intro-section__title {
  font-family: "CantataOne-Regular", serif;
  font-size: $font-size-xxl-screen-lg;
  font-weight: 400;
  line-height: $line-height-sm;
  @include bp(sm) {
    font-size: $font-size-xxl-screen-sm;
  }
}

.date-wrapper {
  position: relative;
}

.date-content {
  position: absolute;
  bottom: 0;
  color: $neutral-grey-c;
}

.content__text {
  line-height: $line-height-md;
}
</style>

<script>
import ContentComponent from "@/components/contentStructure/ContentComponent";

export default {
  name: "IntroSection",

  components: {
    ContentComponent
  },

  props: {
    content: {
      default: null,
      type: Object
    }
  },

  data() {
    return {};
  },

  methods: {
    childReady() {
      this.$emit("ready");
    }
  }
};
</script>
