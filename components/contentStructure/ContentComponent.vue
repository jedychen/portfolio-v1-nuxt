<template>
  <!-- Render a item in content block as a component -->
  <div
    v-if="type == 'text'"
    v-html="parsedHtml"
    class="content__text rich-text-content text-body-1 font-weight-light mb-4 ml-4 mr-md-8 mr-sm-4"
  />
  <InlineImage
    v-else-if="type == 'inlineImage'"
    :content="parsedImage"
    :fullWidth="fullWidth"
    @ready="childReady"
  />
  <InlineVideo
    v-else-if="type == 'inlineVideo'"
    :content="parsedVideo"
    @ready="childReady"
  />
  <InlineCard
    v-else-if="type == 'inlineCard'"
    :content="parsedCard"
    @ready="childReady"
  />
  <InlineCarousel
    v-else-if="type == 'inlineCarousel'"
    :content="parsedSlides"
    :fullWidth="fullWidth"
    @ready="childReady"
  />
  <InlineTable v-else-if="type == 'inlineTable'" :content="parsedTable" />
  <InlineIframe v-else-if="type == 'inlineIframe'" :content="parsedIframe" />
  <div v-else />
</template>

<style lang="scss" scoped>
.content__text {
  line-height: $line-height-md;
  color: $neutral-grey-c;
}
</style>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import InlineCard from "@/components/inlines/InlineCard";
import InlineCarousel from "@/components/inlines/InlineCarousel";
import InlineImage from "@/components/inlines/InlineImage";
import InlineTable from "@/components/inlines/InlineTable";
import InlineVideo from "@/components/inlines/InlineVideo";
import InlineIframe from "@/components/inlines/InlineIframe";

export default {
  name: "ContentComponent",

  components: {
    InlineCard,
    InlineCarousel,
    InlineImage,
    InlineTable,
    InlineVideo,
    InlineIframe
  },

  props: {
    component: {
      default: null,
      type: Object
    },
    fullWidth: {
      default: true,
      type: Boolean
    }
  },

  data() {
    return {
      type: "",
      parsedHtml: "",
      parsedImage: null,
      parsedVideo: null,
      parsedSlides: null,
      parsedTable: null,
      parsedCard: null,
      parsedIframe: null
    };
  },

  created() {
    this.childReady();
  },

  mounted() {
    this.type = this.component.contentType;
    if (this.type == "text") {
      this.parsedHtml = documentToHtmlString(this.component.htmlContent);
    } else if (this.type == "inlineImage") {
      this.parsedImage = this.component;
    } else if (this.type == "inlineVideo") {
      this.parsedVideo = this.component;
    } else if (this.type == "inlineCarousel") {
      this.parsedSlides = this.component;
    } else if (this.type == "inlineCard") {
      this.parsedCard = this.component;
    } else if (this.type == "inlineTable") {
      this.parsedTable = this.component;
    } else if (this.type == "inlineIframe") {
      this.parsedIframe = this.component;
    }
  },

  methods: {
    childReady() {
      this.$emit("ready");
    }
  }
};
</script>
