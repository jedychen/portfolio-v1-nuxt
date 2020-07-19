<template>
  <div>
    <v-carousel
      v-model="currentIndex"
      cycle
      hide-delimiter-background
      hide-delimiters
      @ready="onReady"
    >
      <v-carousel-item
        v-for="(slide, i) in content.slides"
        :key="i"
        :src="slide.file.url"
      />
    </v-carousel>

    <v-row
      class="mt-2"
    >
      <v-col
        cols="12"
        sm="10"
        class="pb-0"
      >
        <p class="subheading">
          {{ currentDescription }}
        </p>
      </v-col>
      <v-col
        cols="12"
        sm="2"
        class="pb-0 carousel__counter"
      >
        <p class="subheading mb-0 font-weight-bold">
          {{ currentIndex + 1 }} / {{ content.slides.length }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.carousel__counter {
  text-align: right;
}
</style>


<script>
  export default {
    name: "InlineCarousel",

    props: {
      content: {
        default: null,
        type: Object
      }
    },

    data () {
      return {
        currentIndex: 0,
      }
    },

    computed: {
      currentDescription() {
        return this.content.slides[this.currentIndex].description
      }
    },

    methods: {
      onReady() {
        this.$emit("ready");
      }
    }
  }
</script>
