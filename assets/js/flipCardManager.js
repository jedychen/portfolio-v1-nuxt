import * as THREE from "three";
import gsap from "gsap";
import FlipCardRender from "./flipCardRender.js";
import { mobileCheck, tabletCheck } from "./utils.js";
import imageUtils from "./imageUtils";

const path = require("path");

/**
 * Window breakpoint configuration.
 * @private
 */
const BREAKPOINTS_ = {
  xs: 340,
  sm: 540,
  md: 800,
  lg: 1280
};

/**
 * Camera's z distance.
 * @private
 */
const CAMERA_DISTANCE_ = {
  single: 360, // one cards in a row.
  double: 720, // two cards in a row.
  triple: 1090 // three cards in a row.
};

/**
 * General configurations.
 * @private
 */
const CONFIGURATION_ = {
  swipeSpeed: 400, // Speed of vertically swipping screen on mobile.
  renderFrequency: 2 // Render in every (n+1) frames
};

/**
 * Device code name.
 * @private
 */
const DEVICE_ = {
  MOBILE: 0,
  TABLET: 1,
  DESKTOP: 2
};

// FlipCardManager Class for used in main.js.
class FlipCardManager {
  constructor() {
    // Device configurations.
    this.autoFlip_ = false; // Automatically flip the cards.
    this.devicePixelRatio_ = 1;
    this.DEVICE_ = DEVICE_.DESKTOP;
    this.configDevice_();

    this.flipCardRender = new FlipCardRender(this.autoFlip_);

    const cardSize = this.flipCardRender.getCardSize();
    // Standard size for setting up positions of light and other major elements.
    this.WALL_SIZE = 9 * cardSize; // Bounding wall's size.
    this.CAMERA_BOTTOM_MARGIN = 2 * cardSize;
    this.PROJECT_WIDTH = this.flipCardRender.getProjectWidth();
    this.PROJECT_HEIGHT = this.flipCardRender.getProjectHeight();
    this.LIGHT_COLOR = 0xffffff;
    this.BACKGROUND_COLOR = 0x161719;

    this.isInitialized_ = false;
    this.cameraY_ = 0;
    this.cameraZ_ = 0;
    this.curIntersectedCard_ = null; // Intersected object with raycaster.
    this.projectClicked_ = false;
    this.loadingProgress_ = 0;
    this.url_ = "";
    // Jedy: Password Disabled
    // this.passwordProtected_ = false;
    this.isRendering_ = true; // If the threeJS is rendering.
    this.container_ = null;
    this.aspectRatio_ = 1;

    this.projectsConfigs_ = {};
    this.projectNum_ = 0;
    this.projectColNum_ = 3;
    this.cardImages_ = []; // Images for each card.

    // Delay rendering
    this.renderCount_ = 0;
  }

  // Main public functions

  /**
   * Initialize the class when vue view is entered.
   * @param {Element} container Html element of the container.
   * @public
   */
  init(container) {
    this.container_ = container;

    // When creating a new vue view (happens when switching tabs).
    if (this.isInitialized_) {
      this.setupResponsive_(false);
      // Append the render to the new container.
      this.setupRenderer_(this.container_);
      this.addEventListeners_();
      return;
    }

    // Functions below only need to be excuted once.

    // Initialize Three.js configurations.
    this.renderer_ = new THREE.WebGLRenderer({ antialias: true });
    this.camera_ = new THREE.PerspectiveCamera(
      48,
      this.container_.clientWidth / this.container_.clientHeight,
      0.1,
      2000
    );
    this.scene_ = new THREE.Scene();
    this.group_ = new THREE.Object3D();

    // Ray caster configurations.
    this.mouse_ = new THREE.Vector2(
      this.container_.clientWidth,
      this.container_.clientHeight
    );
    this.raycaster_ = new THREE.Raycaster();
    this.projectNum_ = this.projectsConfigs_.length;
    this.loadCoverImages_();
    this.addEventListeners_();
  }

  /**
   * Main function for update.
   * @public
   */
  animate() {
    if (!this.isRendering_) return;
    requestAnimationFrame(this.animate.bind(this));
    this.render_();
  }

  // Public functions

  /**
   * Set project configs.
   * @public
   */
  setProjectConfigs(json) {
    this.projectsConfigs_ = json; // Load the Json file from contentful
  }

  /**
   * Get current progess of loading assets/images.
   * @public
   */
  getLoadingProgress() {
    return this.loadingProgress_;
  }

  /**
   * Get current url of the project card visited.
   * @public
   */
  getUrl() {
    return this.url_;
  }

  /**
   * Get current state of password protection.
   * @public
   */
  // Jedy: Password Disabled
  // getPasswordProtectionState() {
  //   return this.passwordProtected_;
  // }

  /**
   * Call when need to transition away to another vue view.
   * @public
   */
  transitionAway() {
    this.isRendering_ = false;
    this.removeEventListeners_();
  }

  /**
   * Call when need to transition back to this canvas view.
   * @public
   */
  transitionBack() {
    this.isRendering_ = true;
    this.flipCardRender.transitionBack();
    if (this.projectClicked_) {
      this.projectClicked_ = false;
    }
    this.url_ = "";
    // Jedy: Password Disabled
    // this.passwordProtected_ = false;
  }

  // Main functions

  /**
   * Main function for rendering and ray castering.
   * @private
   */
  render_() {
    if (this.autoFlip_) {
      this.renderer_.render(this.scene_, this.camera_);
      return;
    }

    if (this.renderCount_ < CONFIGURATION_.renderFrequency) {
      this.renderCount_++;
    } else {
      // When this.renderCount_ == CONFIGURATION_.renderInterval
      this.renderCount_ = 0;

      // Update the picking ray with the camera and mouse position.
      this.raycaster_.setFromCamera(this.mouse_, this.camera_);

      // Calculate objects intersecting the picking ray.
      const intersects = this.raycaster_.intersectObjects(this.group_.children);

      let intersectCard = false;

      // When there is a ray intersection.
      if (intersects.length > 0) {
        // 1. When the mouse is moving on a new card.
        if (this.curIntersectedCard_ != intersects[0].object) {
          // New card should start its flipping animation from begining.
          if (this.flipCardRender.isCard(intersects[0].object)) {
            this.curIntersectedCard_ = intersects[0].object;
            this.flipCardRender.startFlip(this.curIntersectedCard_);
            intersectCard = true;
          }
        }
        // 2. When the mouse is focusing on one single card.
        else if (this.curIntersectedCard_ != null) {
          // The current card holds on the flipped status (text canvas).
          this.flipCardRender.holdFlip(this.curIntersectedCard_);
          intersectCard = true;
        }
      }

      document.documentElement.style.cursor = intersectCard
        ? "pointer"
        : "default";
    }

    this.renderer_.render(this.scene_, this.camera_);
  }

  /**
   * Load cover images for projects.
   * It will set up all the threejs scene after loading the images.
   * @private
   */
  loadCoverImages_() {
    let loadManager = new THREE.LoadingManager();
    let imageLoader = new THREE.TextureLoader(loadManager);

    for (let i = 0; i < this.projectNum_; i++) {
      // 6 cards per project.
      const filename = imageUtils.imgSrc(this.projectsConfigs_[i].coverImage);
      let cardImage = imageLoader.load("/cover/" + filename);
      // let cardImage = imageLoader.load(
      //   this.projectsConfig_.projects[i].coverImage.file.url
      // );
      cardImage.repeat.set(0.333, 0.5);
      this.cardImages_.push(cardImage);
    }

    loadManager.onLoad = () => {
      this.setupLights_(this.group_);
      this.setupResponsive_(true);
      this.scene_.add(this.group_);
      this.setupRenderer_(this.container_);
      console.log("Assets are all loaded.");
      this.isInitialized_ = true;
    };

    loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
      this.loadingProgress_ = itemsLoaded / itemsTotal;
    };
  }

  // SETUP

  /**
   * Detect device and set up device specific configurations.
   * @private
   */
  configDevice_() {
    // Check based on device info
    if (mobileCheck() === true) {
      this.autoFlip_ = true;
      if (tabletCheck()) {
        this.DEVICE_ = DEVICE_.TABLET;
        this.devicePixelRatio_ = 1;
        console.log("Device: Tablet");
      } else {
        this.DEVICE_ = DEVICE_.MOBILE;
        this.devicePixelRatio_ = window.devicePixelRatio;
        console.log("Device: Mobile");
      }
    } else {
      // Desktop
      this.autoFlip_ = false;
      this.devicePixelRatio_ = 1;
      this.DEVICE_ = DEVICE_.DESKTOP;
      console.log("Device: Desktop");
    }
  }

  /**
   * Set up responsive behavior.
   * @param {boolean} resize If only resizing happening.
   * @private
   */
  setupResponsive_(isInitializing = true) {
    this.configureResponsive_();

    // Set up render.
    this.renderer_.setSize(
      this.container_.clientWidth,
      this.container_.clientHeight
    );

    // Set up the camera. Move the camera to the top of project cards.
    const projectsHeight =
      Math.ceil(this.projectNum_ / this.projectColNum_) * this.PROJECT_HEIGHT;
    const projectsWidth = this.projectColNum_ * this.PROJECT_WIDTH;

    this.cameraY_ = projectsHeight * 0.5;
    this.camera_.aspect = this.aspectRatio_;
    this.camera_.position.set(0, this.cameraY_, this.cameraZ_);
    this.camera_.updateProjectionMatrix();

    // Set up the flip cards layout.
    if (this.flipCardRender.isInitialized() == false) {
      this.flipCardRender.initializeProjects(
        this.projectsConfigs_,
        projectsWidth,
        projectsHeight,
        this.projectColNum_,
        this.cardImages_
      );
      for (const card of this.flipCardRender.getAllCards()) {
        this.group_.add(card);
      }
    } else {
      this.flipCardRender.resetProjects(
        projectsWidth,
        projectsHeight,
        this.projectColNum_
      );
    }

    this.group_.position.y =
      (this.projectColNum_ * this.PROJECT_WIDTH * 0.5) / this.aspectRatio_ -
      142;
  }

  /**
   * Calculate configurations for responsive behavior.
   * @private
   */
  configureResponsive_() {
    this.aspectRatio_ =
      this.container_.clientWidth / this.container_.clientHeight;
    const clientWidth = this.container_.clientWidth;

    // Calculate based on screen size.
    switch (true) {
      case clientWidth < BREAKPOINTS_.xs * this.devicePixelRatio_:
        this.projectColNum_ = 1;
        this.cameraZ_ = CAMERA_DISTANCE_.single / this.aspectRatio_;
        break;
      case clientWidth < BREAKPOINTS_.sm * this.devicePixelRatio_:
        this.projectColNum_ = 2;
        this.cameraZ_ = CAMERA_DISTANCE_.double / this.aspectRatio_;
        break;
      case clientWidth < BREAKPOINTS_.md * this.devicePixelRatio_:
        this.projectColNum_ = 3;
        this.cameraZ_ = CAMERA_DISTANCE_.triple / this.aspectRatio_;
        break;
      default:
        this.projectColNum_ = 3;
        this.cameraZ_ = CAMERA_DISTANCE_.triple / this.aspectRatio_;
        break;
    }
  }

  /**
   * Set up Three.js lights.
   * @param {THREE.Object3D} parent Group for adding elements.
   * @private
   */
  setupLights_(parent) {
    let key_light = new THREE.DirectionalLight(this.LIGHT_COLOR, 0.8);
    let ambient_light = new THREE.AmbientLight(this.LIGHT_COLOR, 0.8);
    key_light.position.set(-2 * this.WALL_SIZE, this.WALL_SIZE, this.WALL_SIZE);
    ambient_light.position.set(this.WALL_SIZE, this.WALL_SIZE, this.WALL_SIZE);
    parent.add(key_light).add(ambient_light);
  }

  /**
   * Set up render and append it to container.
   * @param {Element} container Html element of container.
   * @private
   */
  setupRenderer_(container) {
    this.renderer_.setPixelRatio(window.devicePixelRatio);
    this.renderer_.setClearColor(this.BACKGROUND_COLOR, 1.0);
    container.appendChild(this.renderer_.domElement);
  }

  // LISTENER

  /**
   * Main function for adding all the listeners.
   * @private
   */
  addEventListeners_() {
    this.container_.addEventListener("wheel", this.scrollDevice_.bind(this), {
      capture: true,
      passive: true
    });
    this.container_.addEventListener(
      "mousemove",
      this.onMouseMove_.bind(this),
      false
    );
    this.container_.addEventListener(
      "click",
      this.onMouseClick_.bind(this),
      false
    );
    window.addEventListener("resize", this.setupResponsive_.bind(this), false);
  }

  /**
   * Main function for removing all the listeners.
   * @private
   */
  removeEventListeners_() {
    this.container_.removeEventListener(
      "wheel",
      this.scrollDevice_.bind(this),
      false
    );

    this.container_.removeEventListener(
      "mousemove",
      this.onMouseMove_.bind(this),
      false
    );
    this.container_.removeEventListener(
      "click",
      this.onMouseClick_.bind(this),
      false
    );
    window.removeEventListener(
      "resize",
      this.setupResponsive_.bind(this),
      false
    );
  }

  /**
   * Handler for scrolling device on desktop.
   * @param {Event} event JS event.
   * @private
   */
  scrollDevice_(event) {
    event.preventDefault();
    let changedPosY = this.camera_.position.y - event.deltaY;
    if (changedPosY >= this.cameraY_) this.camera_.position.y = this.cameraY_;
    else if (changedPosY <= -this.cameraY_ + this.CAMERA_BOTTOM_MARGIN)
      this.camera_.position.y = -this.cameraY_ + this.CAMERA_BOTTOM_MARGIN;
    else this.camera_.position.y = changedPosY;
  }

  /**
   * Handler for swipping device up on mobile.
   * @public
   */
  swipDeviceUp() {
    let changedPosY = this.camera_.position.y - CONFIGURATION_.swipeSpeed;
    if (changedPosY <= -this.cameraY_ + this.CAMERA_BOTTOM_MARGIN)
      changedPosY = -this.cameraY_ + this.CAMERA_BOTTOM_MARGIN;
    this.hammerSwipe = gsap.to(this.camera_.position, {
      duration: 0.5,
      ease: Elastic.easeOut,
      y: changedPosY
    });
  }

  /**
   * Handler for swipping device down on mobile.
   * @public
   */
  swipDeviceDown() {
    let changedPosY = this.camera_.position.y + CONFIGURATION_.swipeSpeed;
    if (changedPosY >= this.cameraY_) changedPosY = this.cameraY_;
    this.hammerSwipe = gsap.to(this.camera_.position, {
      duration: 0.5,
      ease: Elastic.easeOut,
      y: changedPosY
    });
  }

  /**
   * Handler for raycaster's mouse update.
   * @param {Event} event JS event.
   * @private
   */
  onMouseMove_(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    event.preventDefault();
    this.mouse_.x = (event.offsetX / this.container_.clientWidth) * 2 - 1;
    this.mouse_.y = -(event.offsetY / this.container_.clientHeight) * 2 + 1;
  }

  /**
   * Handler for clicking card.
   * @param {Event} event JS event.
   * @private
   */
  onMouseClick_(event) {
    event.preventDefault();
    // update the picking ray with the camera and mouse position
    this.raycaster_.setFromCamera(this.mouse_, this.camera_);
    // calculate objects intersecting the picking ray
    var intersects = this.raycaster_.intersectObjects(this.group_.children);
    if (
      intersects.length > 0 &&
      this.flipCardRender.isCard(intersects[0].object)
    ) {
      this.curIntersectedCard_ = intersects[0].object;
      this.flipCardRender.transitionAway(this.curIntersectedCard_);
      this.url_ = this.flipCardRender.getUrl(this.curIntersectedCard_);
      // Jedy: Password Disabled
      // this.passwordProtected_ = this.flipCardRender.getPasswordProtectionState(this.intersectedObject_);
      this.projectClicked_ = true;
    }
  }
}

export default FlipCardManager;
