<template>
  <v-row class="mt-13 intro-section elevation-4 mb-0">
    <v-col v-if="content.media" cols="12" class="intro-section__main pa-0">
      <!-- video -->
      <v-container class="intro-section__media pa-0">
        <ContentComponent :component="content.media" @ready="childReady" />
      </v-container>
      <!-- title -->
      <v-row
        class="mx-lg-16 mx-md-4 mx-sm-2 pa-4 intro-section__title-container"
      >
        <h1 class="intro-section__title">
          {{ content.title }}
        </h1>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row class="mx-lg-16 mx-md-4 mx-sm-2 mt-0">
        <!-- copy -->
        <v-col cols="12" md="7" sm="12">
          <p class="text-body-1 font-weight-regular content__text">
            {{ content.description }}
          </p>
        </v-col>
        <v-col cols="12" md="4" sm="12" offset-md="1">
          <!-- subtitle -->
          <p
            v-if="content.subtitle"
            class="text-h5 font-weight-light intro-section__subtitle"
          >
            {{ content.subtitle }}
          </p>
          <!-- tags -->
          <div v-if="content.tags" class="mr-2">
            <v-chip
              small
              v-for="(tag, i) in content.tags"
              :key="'project main tag' + i"
              class="mr-2 mb-2 tag-text"
            >
              {{ tag }}
            </v-chip>
          </div>
          <!-- date -->
          <div class="date-wrapper">
            <p class="text-h5 font-weight-light mt-1">{{ content.date }}</p>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <!-- divider -->
    <v-col cols="12" class="pb-0 px-0">
      <v-divider class="secondary mt-4" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables"; // For breakpoint specific styles

.intro-section {
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    margin-right: -6px;
  }
}

.intro-section__main {
  display: inline-block;
  position: relative;
}

.intro-section__media {
  display: block;
  max-width: 100%;
  height: auto;
}

.intro-section__title {
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-xxl-screen-lg;
  font-weight: $font-weight-medium;
  color: $neutral-white;
  line-height: $line-height-sm;
  position: absolute;
  bottom: 0;

  @media #{map-get($display-breakpoints, 'lg-and-down')} {
    font-size: $font-size-xxl-screen-lg;
  }

  @media #{map-get($display-breakpoints, 'md-and-down')} {
    font-size: $font-size-xxl-screen-md;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    font-size: $font-size-xxl-screen-sm;
  }
}

.intro-section__title-container {
  z-index: 2; // To be above the media
  position: absolute;
  height: 100%;
  width: 60%;
  bottom: 12%;
  pointer-events: none;
  justify-items: end;
  color: black;
  mix-blend-mode: difference;

  @media #{map-get($display-breakpoints, 'md-and-down')} {
    width: 100%;
    bottom: 15%;
  }
}

.intro-section__subtitle {
  color: $neutral-grey-c;
}

.content__text {
  line-height: $line-height-md;
  color: $neutral-grey-c;
}

.intro-section__title-container:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: end; // Align title
}

.date-wrapper {
  position: relative;

  .text-h5 {
    color: $neutral-grey-b;
  }
}

.tag-text {
  text-transform: uppercase;
  color: $neutral-grey-c;
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
