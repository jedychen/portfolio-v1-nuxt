<template>
  <v-row no-gutters class="mb-12">
    <!-- Render Introduction. -->
    <v-col cols="12" md="2" class="py-6">
      <h3 class="text-md-right text-sm-left about-section__title">
        {{ section.title }}
      </h3>
    </v-col>
    <v-col cols="12" md="9" class="py-3 mt-2 offset-md-1">
      <v-row v-if="section.type == 'Timeline'">
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(block, i) in section.contentBlocks"
            :key="block.title"
            color="secondary"
            small
          >
            <v-lazy
              :options="{
                threshold: 1.0
              }"
              :transition="getTransition(i)"
            >
              <v-card
                class="elevation-2 pa-4"
                :style="
                  'background-color:rgba(88,78,87, ' + (1 - i * 0.2) + ')'
                "
              >
                <h5 class="text-h6 font-weight-bold mb-8">
                  {{ block.title }}
                </h5>
                <v-row
                  v-for="item in block.contentItem"
                  :key="item"
                  class="py-2 pa-4 mb-2"
                >
                  <h5 class="text-body-1 pr-6">
                    {{ getConentTitle(item) }}
                  </h5>
                  <v-col class="pa-0">
                    <p class="text-body-1 mb-0">
                      {{ getConentSubtitle(item) }}
                    </p>
                    <p class="text-body-1 font-weight-light mb-0">
                      {{ getConentDescription(item) }}
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </v-lazy>
          </v-timeline-item>
        </v-timeline>
      </v-row>

      <v-row v-else-if="section.type == 'List'">
        <v-col
          v-for="block in section.contentBlocks"
          :key="block.title"
          cols="12"
          :md="4 + block.isBlock * 8"
          :sm="6 + block.isBlock * 6"
          class="mb-4 about-section__content"
        >
          <h5 class="text-body-1 font-weight-bold mb-2">
            {{ block.title }}
          </h5>
          <v-divider color="white" class="mb-2"></v-divider>
          <p
            v-for="item in block.contentItem"
            :key="item"
            class="text-body-1 font-weight-light mb-0"
          >
            {{ item }}
          </p>
        </v-col>
      </v-row>

      <v-row v-else-if="section.type == 'Card'">
        <v-col
          v-for="(block, i) in section.contentBlocks"
          :key="block.title"
          cols="12"
          :md="4 + block.isBlock * 8"
          :sm="6 + block.isBlock * 6"
          class="mb-4 about-section__content"
        >
          <v-lazy
            :options="{
              threshold: 1.0
            }"
            transition="slide-x-transition"
          >
            <v-card
              class="elevation-2"
              :style="'background-color:rgba(88,78,87, ' + (i + 1) * 0.2 + ')'"
            >
              <v-card-title class="text-h5">
                <h5 class="mb-2 text-h6 font-weight-bold">
                  {{ block.title }}
                </h5>
              </v-card-title>
              <v-card-text>
                <p
                  v-for="item in block.contentItem"
                  :key="item"
                  class="text-body-1 font-weight-light mb-0"
                >
                  {{ item }}
                </p>
              </v-card-text>
            </v-card>
          </v-lazy>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables"; // For breakpoint specific styles

.about-section__title {
  font-family: "Futura-Book", sans-serif;
  font-size: $font-size-lg-screen-sm;
  font-weight: 500;
  line-height: $line-height-sm;
  color: $theme-orange;

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    font-size: $font-size-lg-screen-sm;
  }
}

.about-section__content {
  background-color: $copy-color-black-transparent;
}

.v-timeline {
  width: 100%;
}

@keyframes slide-in {
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
</style>

<script>
export default {
  name: "AboutSection",

  props: {
    section: {
      default: null,
      type: Object
    }
  },

  data() {
    return {};
  },

  methods: {
    getTransition(i) {
      if (i % 2 == 0) return "slide-x-transition";
      return "slide-x-reverse-transition";
    },
    getConentTitle(content) {
      const textArray = content.split(":");
      let title = "";
      if (textArray.length > 1) {
        title = textArray[0];
      }
      return title;
    },
    getConentSubtitle(content) {
      const textArray = content.split(":");
      let description = content;
      if (textArray.length > 1) {
        description = content.replace(textArray[0] + ":", "");
      }
      return description.split(",")[0];
    },
    getConentDescription(content) {
      const textArray = content.split(":");
      let description = content;
      if (textArray.length > 1) {
        description = content.replace(textArray[0] + ":", "");
      }
      return description.split(",")[1];
    }
  }
};
</script>
