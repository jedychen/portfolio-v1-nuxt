import * as THREE from "three";
import { gsap, Elastic, Power4 } from "gsap";
import { randomInRange, calcDistance } from "./utils.js";

/**
 * -- Data Structure --
 * "projects": Array, Configuration for projects
 *    "position": number, Position in layout.
 *    "url": string, Jump link.
 *    "imageUrl": string, Image src link.
 *    "themeColor": string, Color for card.
 *    "blocks": Array, Cards info.
 *       "horizontalFlip": boolean, If card is flipping horizontally.
 *       "text": string, Text displayed at the back of a card. Seperate lines with ','.
 */

/** @private */
const CONFIGURATION_ = {
  boldFontSize: 12,
  fontSize: 18, // Text at the back of cards.
  lineHeight: 40, // Text at the back of cards.
  cardName: "card",
  cardThickness: 100
};

// Drawing functions for FlipCardManager.
class FlipCardRender {
  /**
   * @param {boolean} autoFlip If auto flipping is on for device.
   */

  constructor(autoFlip) {
    // Card configurated.
    this.CARD_SIZE = 100;
    this.CARD_COL_NUM = 3;
    this.CARD_ROW_NUM = 2;
    this.SINGLE_PROJECT_HEIGHT = this.CARD_ROW_NUM * this.CARD_SIZE;
    this.SINGLE_PROJECT_WIDTH = this.CARD_COL_NUM * this.CARD_SIZE;
    this.isInitialized_ = false;
    this.cardLastVisited_ = null;
    this.cards_ = [];
    this.autoFlip_ = autoFlip;
    this.projectsHeight_ = 0;
    this.projectsWidth_ = 0;
    this.projectColNum_ = 0;
  }

  /**
   * Check if the class is initialized.
   * @return {boolean}
   * @public
   */
  isInitialized() {
    return this.isInitialized_;
  }

  /**
   * Check if an element is a card.
   * @return {boolean}
   * @public
   */
  isCard(element) {
    if (element && element.name == CONFIGURATION_.cardName) return true;
    return false;
  }

  /**
   * Get each card's width/height size.
   * @return {number}
   * @public
   */
  getCardSize() {
    return this.CARD_SIZE;
  }

  /**
   * Get a card's url.
   * @param {THREE.Mesh} element Card element.
   * @return {string}
   * @public
   */
  getUrl(element) {
    return element.url;
  }

  /**
   * Get a card's password protection state.
   * @param {THREE.Mesh} element Card element.
   * @return {boolean}
   * @public
   */
  // Jedy: Password Disabled
  // getPasswordProtectionState(element) {
  //   return element.passwordProtected;
  // }

  /**
   * Get a project's width value.
   * @return {string}
   * @public
   */
  getProjectWidth() {
    return this.SINGLE_PROJECT_WIDTH;
  }

  /**
   * Get a project's height value.
   * @return {string}
   * @public
   */
  getProjectHeight() {
    return this.SINGLE_PROJECT_HEIGHT;
  }

  /**
   * Get all the cards in an array.
   * @return {Array}
   * @public
   */
  getAllCards() {
    return this.cards_;
  }

  /**
   * Restart the flipping animation.
   * @param {THREE.Mesh} element Card element.
   * @public
   */
  startFlip(element) {
    element.flip.restart();
  }

  /**
   * Continue the flipping animation.
   * @param {THREE.Mesh} element Card element.
   * @public
   */
  continueFlip(element) {
    element.flip.play();
  }

  /**
   * Hold the flipping animation to the 50% progress.
   * @param {THREE.Mesh} element Card element.
   * @public
   */
  holdFlip(element) {
    if (element.flip.progress() >= 0.5) {
      element.flip.tweenTo(2, {
        ease: Power4.easeOut
      });
    }
  }

  // SETUP functions

  /**
   * Set up all the project cards.
   * @param {JSON} projectsConfig Json data of projects' configs.
   * @param {number} projectsWidth Width of all the projects.
   * @param {number} projectsHeight Height of all the projects.
   * @param {number} projectColNum Number of colums of projects.
   * @param {Array} cardImages Array of card image textures.
   * @public
   */
  initializeProjects(
    projectsConfig,
    projectsWidth,
    projectsHeight,
    projectColNum,
    cardImages
  ) {
    this.projectsWidth_ = projectsWidth;
    this.projectsHeight_ = projectsHeight;
    this.projectColNum_ = projectColNum;
    let geometry = new THREE.BoxBufferGeometry(
      this.CARD_SIZE,
      this.CARD_SIZE,
      CONFIGURATION_.cardThickness
    );
    for (let [index, projectConfig] of this.enumerate(
      projectsConfig.projects
    )) {
      this.setupSingleProject_(index, projectConfig, cardImages, geometry);
    }
    this.isInitialized_ = true;
  }

  /**
   * Reset all projects cards.
   * @param {number} projectsWidth Width of all the projects.
   * @param {number} projectsHeight Height of all the projects.
   * @param {number} projectColNum Number of colums of projects.
   * @public
   */
  resetProjects(projectsWidth, projectsHeight, projectColNum) {
    this.projectsWidth_ = projectsWidth;
    this.projectsHeight_ = projectsHeight;
    this.projectColNum_ = projectColNum;
    for (let card of this.cards_) {
      this.setupCardPos_(card);
    }
  }

  /**
   * Set up cards for a single project.
   * Use the project theme color for text background and card's side background.
   * @param {number} index Index position of this project on the canvas.
   * @param {JSON} projectConfig Json data of single project's config.
   * @param {Array} cardImages Array of card image textures.
   * @param {THREE.BoxBufferGeometry} geometry Card geometry.
   * @private
   */
  setupSingleProject_(index, projectConfig, cardImages, geometry) {
    const projectIndex = index;

    const imageOffsets = [
      { x: 0, y: 0.5 },
      { x: 0.333, y: 0.5 },
      { x: 0.666, y: 0.5 },
      { x: 0, y: 0 },
      { x: 0.333, y: 0 },
      { x: 0.666, y: 0 }
    ]; // Cordinate's origin is at left bottom corner

    for (let i = 0; i < 6; i++) {
      // Jedy: Disabled horizontal flip
      let horizontalFlip = false; //projectConfig.cards[i].horizontalFlip;
      const cardImage = cardImages[projectIndex].clone();
      cardImage.offset.set(imageOffsets[i].x, imageOffsets[i].y);
      const frontImageMaterial = new THREE.MeshBasicMaterial({
        // front
        map: cardImage,
        transparent: false,
        side: THREE.FrontSide
      });
      frontImageMaterial.map.needsUpdate = true;

      const sideImage = cardImage.clone();
      const sideImageOffsets = [
        { x: 0.0, y: 1.5 },
        { x: 0.333, y: 1.5 },
        { x: 0.666, y: 1.5 },
        { x: 0.0, y: -0.5 },
        { x: 0.333, y: -0.5 },
        { x: 0.666, y: -0.5 }
      ];
      sideImage.offset.set(sideImageOffsets[i].x, sideImageOffsets[i].y);
      const sideImageMaterial = new THREE.MeshBasicMaterial({
        map: sideImage,
        transparent: false,
        side: THREE.DoubleSide
      });
      sideImageMaterial.map.needsUpdate = true;

      const titleArray = projectConfig.keyWords[i].split(":");
      let title = "";
      let description = projectConfig.keyWords[i];
      if (titleArray.length > 1) {
        title = titleArray[0];
        description = titleArray[1];
      }
      const textImage = this.drawTextAsTexture_(
        title,
        description.split(","),
        projectConfig.themeColor,
        "normal",
        horizontalFlip
      );

      var pitchMaterialParams = {
        uniforms: THREE.UniformsUtils.merge([
          {
            texture1: null,
            texture2: null,
            xscale: 1,
            yscale: 1,
            xoffset: 0,
            yoffset: 0
          }
        ]),
        vertexShader: `
    
           precision highp float;
           precision highp int;
           varying vec2 vUv;
    
           void main() {
             vUv = uv;
             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
           }
    
         `,
        fragmentShader: `
    
           precision mediump float;
           uniform sampler2D texture1;
           uniform sampler2D texture2;
           uniform float xscale;
           uniform float yscale;
           uniform float xoffset;
           uniform float yoffset;
           varying vec2 vUv;
    
           float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
           }

           void main() {
             vec2 newvUv = vec2((1.0-vUv.x) * xscale + xoffset, vUv.y * yscale + yoffset);
             vec4 col1 = texture2D(texture1, newvUv);
             vec4 col2 = texture2D(texture2, vUv);
             float level = col1.r + col1.g + col1.b;
             float brightness = map(level, 2.1, 3.0, 1.0, 0.8);
             if (brightness > 1.0) {
               brightness = 1.0;
             }
             gl_FragColor = col2.a > 0.5 ? col2 : col1 * brightness;
             // gl_FragColor = mix( col1, col2, 0.25 );
           }
         `
      };

      // Dummy box for reference.
      //scene.add( new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({color:0xff0000})) );
      const shaderOffsets = [
        { x: 0.0, y: 1.5 },
        { x: 0.333, y: 1.5 },
        { x: 0.666, y: 1.5 },
        { x: 0.0, y: -0.5 },
        { x: 0.333, y: -0.5 },
        { x: 0.666, y: -0.5 }
      ];
      const textCombinedMaterial = new THREE.ShaderMaterial(
        pitchMaterialParams
      );
      textCombinedMaterial.uniforms.texture1.value = sideImage;
      textCombinedMaterial.uniforms.texture2.value = textImage;
      textCombinedMaterial.uniforms.xscale.value = 0.333;
      textCombinedMaterial.uniforms.yscale.value = 0.5;
      textCombinedMaterial.uniforms.xoffset.value = shaderOffsets[i].x;
      textCombinedMaterial.uniforms.yoffset.value = shaderOffsets[i].y;

      let cardMaterial = [
        sideImageMaterial, //left
        sideImageMaterial, //right
        sideImageMaterial, // top
        sideImageMaterial, // bottom
        frontImageMaterial, //Front
        textCombinedMaterial // Back
      ];

      let card = new THREE.Mesh(geometry, cardMaterial);
      card.name = "card";
      card.index = i; // index is between 0 to 6
      card.projectIndex = projectIndex;
      card.rotateDirection = Math.random() < 0.5 ? -Math.PI : Math.PI;
      card.rotateAxis = horizontalFlip ? "y" : "x";
      card.url = projectConfig.slug;
      // Jedy: Password Disabled
      // card.passwordProtected = projectConfig.passwordProtected;

      this.setupCardPos_(card);
      this.addCardFlipAnimation_(card);
      this.cards_.push(card);
    }
  }

  /**
   * Set up the position of single card.
   * @param {THREE.Mesh} card Card element.
   * @private
   */
  setupCardPos_(card) {
    const projectIndex = card.projectIndex;
    const projectOrigin = this.calcuProjectOriginPos_(projectIndex);
    const cardIndex = card.index;

    // Calculate and set card's absolute position in canvas.
    const x =
      projectOrigin.x + (cardIndex % this.CARD_COL_NUM) * this.CARD_SIZE;
    const y =
      projectOrigin.y -
      Math.floor(cardIndex / this.CARD_COL_NUM) * this.CARD_SIZE;
    card.position.set(x, y, 0);

    // Assign card a grid position of index (x, y) in the canvas.
    // Card at the top-left corner is (0, 0), and the next card on the right is (1, 0).
    var projOriginPos = {
      x: (projectIndex % this.projectColNum_) * this.CARD_COL_NUM,
      y: Math.floor(projectIndex / this.projectColNum_) * this.CARD_ROW_NUM
    };
    card.gridPos = {
      x: projOriginPos.x + (cardIndex % this.CARD_COL_NUM),
      y: projOriginPos.y + Math.floor(cardIndex / this.CARD_COL_NUM)
    };
  }

  /**
   * Calculates a project's origin position on canvas.
   * @param {number} projectIndex Project's index number.
   * @private
   */
  calcuProjectOriginPos_(projectIndex) {
    let xOrigin =
      -this.projectsWidth_ * 0.5 +
      (projectIndex % this.projectColNum_) * this.SINGLE_PROJECT_WIDTH;
    let yOrigin =
      this.projectsHeight_ * 0.5 -
      Math.floor(projectIndex / this.projectColNum_) *
        this.SINGLE_PROJECT_HEIGHT;
    return {
      x: xOrigin + this.CARD_SIZE * 0.5,
      y: yOrigin + this.CARD_SIZE * 0.5
    };
  }

  /**
   * Render a card's text on a canvas as a texture.
   * @param {Array} textArray Text array.
   * @param {string} color Color in hex number.
   * @param {string} fontWeight Font weight like 'normal'/'bold'/'lighter'.
   * @param {boolean} horizontalFlip If the card is flipping horizontally.
   * @private
   */
  drawTextAsTexture_(title, textArray, color, fontWeight, horizontalFlip) {
    var canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    var context = canvas.getContext("2d");
    // context.fillStyle = "white";
    context.fillStyle = "rgba(255, 255, 255, 0)";
    // Rotates canvas if the card is not flipping horizontally.
    var flip = 1;
    if (!horizontalFlip) {
      context.rotate(Math.PI);
      flip = -1;
    }
    // Draw canvas background
    context.fillRect(0, 0, flip * canvas.width, flip * canvas.height);
    // Draw texts
    var x = (flip * canvas.width) / 2 - 110;
    var y = (flip * canvas.height) / 2 - 70;
    context.fillStyle = "white";
    context.textAlign = "left";
    context.font =
      fontWeight +
      " " +
      CONFIGURATION_.boldFontSize.toString() +
      "pt Helvetica";
    if (title != "") {
      context.fillText(title, x, y);
      y += CONFIGURATION_.lineHeight;
    }
    context.font =
      fontWeight + " " + CONFIGURATION_.fontSize.toString() + "pt Helvetica";
    for (const text of textArray) {
      context.fillText(text, x, y);
      y += CONFIGURATION_.lineHeight;
    }

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // Animations

  /**
   * Add flipping animation as GSAP timeline.
   * @param {THREE.Mesh} card Card element.
   * @private
   */
  addCardFlipAnimation_(card) {
    const duration = 2; // seconds
    let delay = 0;
    let pause = true;
    let repeat = 0;

    // Auto flip for mobile versions.
    if (this.autoFlip_) {
      delay = randomInRange(0, 40);
      pause = false;
      repeat = -1;
    }

    var config_flip = {
      ease: Elastic.easeOut,
      duration: duration,
      delay: delay
    };

    // Flip back when mouse moving away.
    var config_reverse = {
      ease: Elastic.easeOut,
      duration: duration,
      delay: 0.1 // To avoid jumpping when holding the flipping animation.
    };

    config_flip[card.rotateAxis] = card.rotateDirection;
    config_reverse[card.rotateAxis] = 0;

    card.flip = gsap
      .timeline({
        paused: pause,
        repeat: repeat
      })
      .to(card.rotation, config_flip, "flip")
      .to(card.rotation, config_reverse, "reverse");
  }

  /**
   * Add fade away transition to all the cards.
   * @param {THREE.Mesh} card Card element.
   * @public
   */
  transitionAway(cardVisited) {
    this.cardLastVisited_ = cardVisited;
    for (let card of this.cards_) {
      // Flips back the cards that are turned around.
      if (card.flip.progress != 1.0) {
        let config_flip_back = {
          ease: Power4.easeOut,
          duration: 0.5
        };
        config_flip_back[card.rotateAxis] = 0;
        gsap.to(card.rotation, config_flip_back);
      }

      // Removes the flip animation completely
      card.flip.clear();

      let config_ripple = {
        ease: Elastic.easeOut,
        duration: 2,
        z: 100
      };

      config_ripple["delay"] =
        0.2 * calcDistance(card.gridPos, cardVisited.gridPos);

      let config_fade = {
        ease: Power4.easeOut,
        duration: 1,
        opacity: 0
      };
      config_fade["delay"] =
        config_ripple["delay"] + config_ripple["duration"] - 1.2;

      // Moves the cards up on z axis.
      gsap.to(card.position, config_ripple);
      // Add fading animation to the all sides of the cards
      gsap.to(card.material[0], config_fade);
      gsap.to(card.material[1], config_fade);
      gsap.to(card.material[2], config_fade);
      gsap.to(card.material[3], config_fade);
      gsap.to(card.material[4], config_fade);
      gsap.to(card.material[5], config_fade);
    }
  }

  /**
   * Wrapper funcition to set transition animation when visiting back.
   * @public
   */
  transitionBack() {
    setTimeout(this.transitionBack_.bind(this), 1000);
  }

  /**
   * Set transition animation when visiting back.
   * @private
   */
  transitionBack_() {
    if (this.cardLastVisited_ == null) {
      this.cardLastVisited_ = this.cards_[0];
    }
    for (let card of this.cards_) {
      let config_fade = {
        ease: Power4.easeOut,
        duration: 1,
        opacity: 1
      };
      config_fade["delay"] =
        0.2 * calcDistance(card.gridPos, this.cardLastVisited_.gridPos);

      let config_ripple = {
        ease: Elastic.easeOut,
        duration: 2,
        z: 0
      };
      config_ripple["delay"] =
        config_fade["delay"] + config_fade["duration"] - 1.2;

      // Add fading animation to the all sides of the cards
      gsap.to(card.material[0], config_fade);
      gsap.to(card.material[1], config_fade);
      gsap.to(card.material[2], config_fade);
      gsap.to(card.material[3], config_fade);
      gsap.to(card.material[4], config_fade);
      gsap.to(card.material[5], config_fade);
      // Moves the cards up on z axis.
      gsap.to(card.position, config_ripple);

      this.addCardFlipAnimation_(card);
    }
  }

  /**
   * Interates over an iterable, and return index.
   * @public
   */
  *enumerate(iterable) {
    let i = 0;

    for (const x of iterable) {
      yield [i, x];
      i++;
    }
  }
}

export default FlipCardRender;
