<template>
  <div
    class="feature-work__container"
    ref="container"
    :class="{
      'loading-in-progress': loadingProgress < 100,
      'loading-completed': loadingProgress >= 100
    }"
  >
    <div
      id="threejs-container"
      v-touch="{
        left: () => swipe('Left'),
        right: () => swipe('Right'),
        up: () => swipe('Up'),
        down: () => swipe('Down')
      }"
    />
    <v-container class="loading__container">
      <v-row class="fill-height" align-content="center" justify="center">
        <div class="loading-circle__container">
          <span
            class="loading-circle"
            :style="{ backgroundImage: tweenedGradienceColor }"
          />
        </div>
      </v-row>
    </v-container>
    <div class="feature-work__placeholder-links mx-8">
      <h2 class="text-h5">
        Projects:
      </h2>
      <div
        v-for="(link, i) in projectLinks"
        :key="'project link' + i"
        class="feature-work__placeholder-container my-4"
      >
        <NuxtLink :to="'/work/' + link.slug" class="text-h5 ">
          {{ link.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.feature-work__container {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  opacity: 1;
  visibility: visible;
  width: 100vw;

  &.loading-completed {
    .loading__container {
      visibility: hidden;

      .loading-circle {
        opacity: 0;
      }
    }

    #threejs-container {
      opacity: 1;
    }
  }

  &.loading-in-progress {
    .loading__container {
      visibility: visible;
    }
  }

  &.project-clicked {
    opacity: 0;
    visibility: hidden;
    transition: all 1s ease;
    transition-delay: 1.5s;
  }
}

.feature-work__placeholder-links {
  position: absolute;
  left: 0;
  align-items: center;
  z-index: -1;
  visibility: hidden;
}

#threejs-container {
  height: 100%;
  opacity: 0;
  padding: 0;
  margin: 0;
  transition: all 1s ease;
  transition-delay: 0.5s;
  width: 100%;
}

.loading-circle__container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-circle {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: inline-block;
}

.loading__container {
  position: fixed;
  visibility: hidden;

  .loading-circle {
    opacity: 1;
    transition: all 0.5s ease;
    animation-delay: 0.3s;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>

<script>
import contentful from "@/plugins/contentful.js";
import * as prettify from "pretty-contentful";
import { gsap } from "gsap";
import projectConfigurations from "@/contentful/response-projectConfigurations.json"; // Adjust path as needed

export default {
  head() {
    return {
      title: "Jedy Chen",
      meta: [
        {
          hid: "Home Page of JedyChen.com",
          name: "Home Page",
          content: "A collection of Jedy's featured work."
        }
      ]
    };
  },

  data() {
    return {
      theme_class: "feature-work__container",
      container: null,
      loadingFirstPos: 100, // For loading gradience, grey
      loadingSecondPos: 100, // For loading gradience, orange
      loadingThirdPos: 100, // For loading gradience, yellow
      projectLinks: [], // To hold contentful project data
      projectsNew: projectConfigurations
    };
  },

  asyncData({ params }) {
    return Promise.all([
      // fetch all blog posts sorted by creation date
      contentful.getEntries({
        content_type: "projectConfigurations",
        include: 6
      })
    ])
      .then(([result]) => {
        // return data that should be available
        // in the template
        return {
          projects: result.items
        };
      })
      .catch(console.error);
  },

  computed: {
    loadingProgress() {
      return this.$store.getters["flipCardStore/getLoadingProgress"];
    },
    clickedProject() {
      return this.$store.getters["flipCardStore/getClickedProject"];
    },
    tweenedGradienceColor() {
      return `linear-gradient(180deg, rgba(88, 78, 87, 1) ${this.loadingFirstPos}%, rgba(183, 75, 65, 1) ${this.loadingSecondPos}%, rgba(248, 136, 38, 1) ${this.loadingThirdPos}%)`;
    }
  },

  watch: {
    loadingProgress(value) {
      const firstPos = (100 - value) * 1 - 50;
      const secondPos = (100 - value) * 1;
      const thirdPos = 100;
      // Tween the gradience position to make the loading animation smoother
      gsap.to(this.$data, {
        duration: 1,
        loadingFirstPos: firstPos,
        loadingSecondPos: secondPos,
        loadingThirdPos: thirdPos
      });
    },
    clickedProject(value) {
      if (value != "") {
        this.container.classList.add("project-clicked");
        // Jedy: Password Disabled
        // let passwordProtectionState = this.$store.getters[
        //   "flipCardStore/getPasswordProtectionState"
        // ];
        // this.$store.commit(
        //   "passwordStore/setProtectionState",
        //   passwordProtectionState
        // );
        this.$router.push({ path: `/work/${value}` });
      }
    }
  },

  beforeMount() {
    this.parseContentful();
  },

  mounted() {
    // Jedy: Password Disabled
    // this.$passwordProtect.removeAuthorisation()
    this.container = document.querySelector(".feature-work__container");
    this.detectWebGL();
    this.$store.commit(
      "flipCardStore/init",
      document.querySelector("#threejs-container")
    );
  },

  methods: {
    detectWebGL() {
      /* https://threejs.org/examples/js/Detector.js */
      const Detector = {
        canvas: !!window.CanvasRenderingContext2D,
        webgl: (function() {
          try {
            var e = document.createElement("canvas");
            return (
              !!window.WebGLRenderingContext &&
              (e.getContext("webgl") || e.getContext("experimental-webgl"))
            );
          } catch (t) {
            return false;
          }
        })(),
        workers: !!window.Worker,
        fileapi:
          window.File && window.FileReader && window.FileList && window.Blob,
        getWebGLErrorMessage: function() {
          var e = document.createElement("div");
          e.id = "webgl-error-message";
          e.style.fontFamily = "monospace";
          e.style.fontSize = "13px";
          e.style.fontWeight = "normal";
          e.style.textAlign = "center";
          e.style.background = "#fff";
          e.style.color = "#000";
          e.style.padding = "1.5em";
          e.style.width = "400px";
          e.style.margin = "5em auto 0";
          if (!this.webgl) {
            e.innerHTML = window.WebGLRenderingContext
              ? [
                  'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
                  'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
                ].join("\n")
              : [
                  'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
                  'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
                ].join("\n");
            document.querySelector(
              ".feature-work__placeholder-links"
            ).style.visibility = "visible";
          }
          return e;
        },
        addGetWebGLMessage: function(e) {
          var t, n, r;
          e = e || {};
          t = e.parent !== undefined ? e.parent : document.body;
          n = e.id !== undefined ? e.id : "oldie";
          r = Detector.getWebGLErrorMessage();
          r.id = n;
          t.appendChild(r);
        }
      };
      const script = document.createElement("script");
      if (!Detector.webgl) Detector.addGetWebGLMessage();
    },
    swipe(direction) {
      this.$store.commit("flipCardStore/swipeDevice", direction);
    },
    parseContentful() {
      console.log(this.projectsNew);
      const flattenedData = prettify(this.projects);
      // Divide the contentful response by data type
      this.$store.commit("flipCardStore/setConfigsData", flattenedData[0]);
      this.$store.commit(
        "contentfulStore/setProjectConfigs",
        flattenedData[0].projects
      );
      this.projectLinks = flattenedData[0].projects;
    }
  }
};
</script>
