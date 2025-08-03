<template>
  <VLoading
    :class="{ 'loading--hide': loadingFinished == false }"
    :percentage="loadingPercentage"
  />
  <div ref="wrapper" class="wrapper">
    <VHover
      v-if="currentlyHovered && !props.dialogVisible"
      :class="{ 'popup--checked': alreadyChecked == true }"
      :mouse-x="mouseX"
      :mouse-y="mouseY"
    >
      {{ currentlyHovered }}
    </VHover>
    <ul class="directions">
      <li
        class="directions__el directions__el--left"
        @touchstart="moveLeft"
        @touchend="stopMoveLeft"
        @mousedown="moveLeft"
        @mouseup="stopMoveLeft"
      >
        <svg
          width="64"
          height="67"
          viewBox="0 0 64 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.0028 9.74535V3.59613L61.8788 33.4743L32.0028 63.3524V57.1016V55.6016H30.5028H1.5V11.2453H30.5028H32.0028V9.74535Z"
            stroke="white"
            stroke-width="3"
          />
        </svg>
      </li>
      <li
        class="directions__el directions__el--right"
        @touchstart="moveRight"
        @touchend="stopMoveRight"
        @mousedown="moveRight"
        @mouseup="stopMoveRight"
      >
        <svg
          width="64"
          height="67"
          viewBox="0 0 64 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.0028 9.74535V3.59613L61.8788 33.4743L32.0028 63.3524V57.1016V55.6016H30.5028H1.5V11.2453H30.5028H32.0028V9.74535Z"
            stroke="white"
            stroke-width="3"
          />
        </svg>
      </li>
    </ul>
    <canvas class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { gsap, Power1 } from 'gsap';
import VHover from './VHover.vue';
import VLoading from './VLoading.vue';

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: false,
  },
  dialogList: {
    type: Array,
    required: false,
  },
  background: {
    type: String,
    required: false,
  },
  activatedSwitches: {
    type: Array,
    required: false,
  },
});
const emit = defineEmits(['openTextBox', 'loadingFinished']);
const currentlyHovered = ref('');
const alreadyChecked = ref(false);
const loadingFinished = ref(false);
const loadingPercentage = ref(0);
let loopCounter = 0;
let previousHovered;

// Random
function RandomNum(min, max) {
  const n = min + Math.random() * (max + 1 - min);
  return n;
}

// Three.js

const wrapper = ref(null);
const canvas = ref(null);
const mouseX = ref(null);
const mouseY = ref(null);
const sizes = {
  w: 0,
  h: 0,
  dpr: Math.min(window.devicePixelRatio, 2),
};

let animateTrafficCount = 1;
let animatBoardCount = 0;

onMounted(() => {
  // Get the DOM elements
  canvas.value = document.querySelector('.canvas');
  sizes.w = window.innerWidth;
  sizes.h = window.innerHeight;

  document.addEventListener('mousemove', (e) => {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
  });

  // Create our 3D viewer
  const myViewer = new Viewer(canvas.value, sizes);
  myViewer.populate();
  myViewer.animate();
  if (props.background == './3d/level-1-texture-2d-parallax-lvl1-edit.glb') {
    myViewer.animateTraffic();
    myViewer.animateBoard();
    myViewer.animateBenches();
    myViewer.animateFountain();
  }

  watch(
    () => props.background,
    () => {
      myViewer.replaceAll();
      if (
        props.background == './3d/level-1-texture-2d-parallax-lvl1-edit.glb'
      ) {
        myViewer.animateTraffic();
        myViewer.animateBoard();
        myViewer.animateBenches();
        myViewer.animateFountain();
      }
    },
  );

  watch(
    () => props.activatedSwitches.length,
    () => {
      for (const activatedSwitch of props.activatedSwitches) {
        if (activatedSwitch == 'streetlight-off') {
          myViewer.updateStreetlight();
        }
      }
    },
  );
});
/**
 * Loading
 * */
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    loadingFinished.value = true;
    emit('loadingFinished');
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) => {
    loadingPercentage.value = Math.round((itemsLoaded / itemsTotal) * 100);
    loadingFinished.value = false;
  },
);

const gltfLoader = new GLTFLoader(loadingManager);
const dracoLoader = new DRACOLoader(loadingManager);
const textureLoader = new THREE.TextureLoader(loadingManager);
const protaStill = textureLoader.load('./img/sprite-anim/0.png');
const protaRunning = [
  textureLoader.load('./img/sprite-anim/1.png'),
  textureLoader.load('./img/sprite-anim/2.png'),
  textureLoader.load('./img/sprite-anim/3.png'),
  textureLoader.load('./img/sprite-anim/4.png'),
  textureLoader.load('./img/sprite-anim/5.png'),
  textureLoader.load('./img/sprite-anim/6.png'),
  textureLoader.load('./img/sprite-anim/7.png'),
  textureLoader.load('./img/sprite-anim/8.png'),
];
const textureProtaStill = new THREE.MeshBasicMaterial({
  map: protaStill,
  transparent: true,
  side: THREE.DoubleSide,
});
const textureProtaRunning = [
  new THREE.MeshBasicMaterial({
    map: protaRunning[0],
    transparent: true,
    side: THREE.DoubleSide,
  }),
  new THREE.MeshBasicMaterial({
    map: protaRunning[1],
    transparent: true,
    side: THREE.DoubleSide,
  }),
  new THREE.MeshBasicMaterial({
    map: protaRunning[2],
    transparent: true,
    side: THREE.DoubleSide,
  }),
  new THREE.MeshBasicMaterial({
    map: protaRunning[3],
    transparent: true,
    side: THREE.DoubleSide,
  }),
  new THREE.MeshBasicMaterial({
    map: protaRunning[4],
    transparent: true,
    side: THREE.DoubleSide,
  }),
  new THREE.MeshBasicMaterial({
    map: protaRunning[5],
    transparent: true,
    side: THREE.DoubleSide,
  }),
  new THREE.MeshBasicMaterial({
    map: protaRunning[6],
    transparent: true,
    side: THREE.DoubleSide,
  }),
  new THREE.MeshBasicMaterial({
    map: protaRunning[7],
    transparent: true,
    side: THREE.DoubleSide,
  }),
];
const particleFountainMesh = new THREE.SphereGeometry(0.02, 4, 4);
const particleFountainMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});

const keyState = {};
window.addEventListener(
  'keydown',
  function (e) {
    keyState[e.keyCode || e.which] = true;
  },
  true,
);
window.addEventListener(
  'keyup',
  function (e) {
    keyState[e.keyCode || e.which] = false;
  },
  true,
);

const moveLeft = () => {
  keyState[81] = true;
};

const moveRight = () => {
  keyState[68] = true;
};

const stopMoveRight = () => {
  keyState[68] = false;
};

const stopMoveLeft = () => {
  keyState[81] = false;
};

class Particle {
  constructor(animTime) {
    this.mesh = new THREE.Mesh(particleFountainMesh, particleFountainMaterial);
    this.mesh.name = 'particleFountain';
    this.mesh.position.set(RandomNum(-10, -2) / 30, -0.2, 8.6);
    this.duration = animTime;
    this.changePosition();
    return this.mesh;
  }
  changePosition() {
    gsap.to(this.mesh.position, {
      y: this.mesh.position.y + RandomNum(2, 40) / 80,
      ease: Power1.easeInOut,
      duration: this.duration,
    });

    gsap.to(this.mesh.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: this.duration,
    });
  }
}

class Viewer {
  constructor(canvas, sizes) {
    this.canvas = canvas;
    this.setRenderer(sizes);
  }

  setRenderer(sizes) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(sizes.w, sizes.h);
    this.renderer.setPixelRatio(sizes.dpr);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    // Camera
    this.camera = new THREE.PerspectiveCamera(30, sizes.w / sizes.h, 1, 10000);
    this.camera.position.z = 10.64;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#929292');
    this.scene.add(this.camera);

    // Resize
    window.addEventListener('resize', () => {
      sizes.w = window.innerWidth;
      sizes.h = window.innerHeight;
      this.renderer.setSize(sizes.w, sizes.h);

      this.camera.aspect = sizes.w / sizes.h;
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
    });

    window.addEventListener('mousemove', () => {
      this.mouse.x = (mouseX.value / sizes.w) * 2 - 1;
      this.mouse.y = -(mouseY.value / sizes.h) * 2 + 1;
    });
  }

  populate() {
    // Light
    this.light = new THREE.DirectionalLight('#ffffff', 1);
    this.light.position.set(1, 3, 2);
    this.ambientLight = new THREE.AmbientLight('#ffffff', 0.8);

    this.scene.add(this.light, this.ambientLight);

    // Fog
    this.fog = new THREE.Fog('#929292', 1, 11);
    this.scene.fog = this.fog;

    // Animation data
    this.trafficlights = null;
    this.trafficLightsTextures = [];
    this.board = null;
    this.boardTextures = [];
    this.benches = [];

    // Model loader
    this.sceneElements = [];
    dracoLoader.setDecoderPath('./draco/');
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(props.background, (gltf) => {
      const children = [...gltf.scene.children];
      for (const child of children) {
        child.position.z = child.position.z + 8;
        this.scene.add(child);
        this.sceneElements.push(child);

        if (child.name.includes('0')) {
          child.name = child.name.substring(0, child.name.length - 3);
        }

        if (child.name == 'bench') {
          this.benches.push(child);
        }

        if (child.name.includes('trafficlights')) {
          this.trafficLightsTextures.push(child.material);
          if (child.name == 'trafficlights') {
            this.trafficlights = child;
          }
        }
        if (child.name == 'board') {
          this.board = child;
          this.boardTextures[0] = child.material;
        } else if (child.name == 'board-2') {
          this.boardTextures[1] = child.material;
        }
      }
      this.animateBenches();
    });

    // Model running
    this.prota = new THREE.Mesh(
      new THREE.PlaneGeometry(0.2, 0.35),
      textureProtaStill,
    );
    this.prota.position.set(0, -0.1, 9.2);
    this.currentProtaSprite = {
      running: false,
      status: 0,
      previousSpriteFinished: false,
    };

    this.scene.add(this.prota);

    // Raycaster
    this.raycaster = new THREE.Raycaster();
    this.currentIntersect = null;

    // Click effect

    const clickOnCanvas = () => {
      const clickOnCanvasAction = () => {
        this.currentIntersect = this.intersects[0];
        if (this.currentIntersect && !props.dialogVisible) {
          emit('openTextBox', this.currentIntersect.object.name);
        }
      };

      if (window.innerWidth > 992) {
        clickOnCanvasAction();
      } else {
        setTimeout(() => {
          clickOnCanvasAction();
        }, 10);
      }
    };
    this.canvas.addEventListener('click', clickOnCanvas);
    this.canvas.addEventListener('touchdown', clickOnCanvas);

    // Mouse
    this.mouse = new THREE.Vector2(300, 300);
  }

  animate() {
    gsap.ticker.add(() => {
      this.render();
    });
  }

  animateSprite() {
    if (this.currentProtaSprite.running == false) {
      this.currentProtaSprite.running = true;
      this.prota.material = textureProtaRunning[0];
    }

    if (loopCounter == 0) {
      if (
        this.currentProtaSprite.running == true &&
        this.currentProtaSprite.status < textureProtaRunning.length
      ) {
        this.prota.material =
          textureProtaRunning[this.currentProtaSprite.status];
        this.currentProtaSprite.status += 1;
      } else if (
        this.currentProtaSprite.running == true &&
        this.currentProtaSprite.status == textureProtaRunning.length
      ) {
        this.currentProtaSprite.status = 0;
      }
    }
  }

  replaceAll() {
    loadingPercentage.value = 0;
    loadingFinished.value = false;

    this.prota.position.set(0, -0.1, 9.2);
    this.camera.position.x = 0;

    for (const child of this.scene.children) {
      if (child.name == 'particleFountain') {
        child.visible = false;
      }
    }

    setTimeout(() => {
      while (this.scene.children.length) {
        this.scene.remove(this.scene.children[0]);
      }
      this.populate();
    }, 300);
  }

  updateStreetlight() {
    let toReplace;
    for (const child of this.scene.children) {
      if (child.name == 'streetlight-on') {
        toReplace = child;
      }
    }
    for (const child of this.scene.children) {
      if (child.name == 'streetlight-off') {
        for (const [index, sceneElement] of this.sceneElements.entries()) {
          if (sceneElement.name == 'streetlight-off') {
            this.sceneElements.splice(index, 1);
          }
        }

        this.scene.remove(child);
        const streetlightUpdated = toReplace.clone();
        streetlightUpdated.position.x -= 0.4;
        streetlightUpdated.position.y -= 0.02;
        streetlightUpdated.rotation.z = Math.PI;

        streetlightUpdated.name = 'streetlight-on';

        this.sceneElements.push(streetlightUpdated);

        this.scene.add(streetlightUpdated);
      }
    }
  }

  animateTraffic() {
    if (this.trafficLightsTextures[1]) {
      this.trafficlights.material =
        this.trafficLightsTextures[animateTrafficCount];

      if (animateTrafficCount < 1) {
        animateTrafficCount += 1;
      } else {
        animateTrafficCount = 0;
      }
    }

    setTimeout(() => {
      this.animateTraffic();
    }, 2000);
  }

  animateBoard() {
    if (this.boardTextures[1]) {
      if (animatBoardCount < 3) {
        animatBoardCount += 1;

        this.board.material = this.boardTextures[0];
      } else {
        animatBoardCount = 0;
        this.board.material = this.boardTextures[1];
      }
    }

    setTimeout(
      () => {
        this.animateBoard();
      },
      10 + Math.random() * 1000,
    );
  }

  animateBenches() {
    if (this.benches[9]) {
      for (const bench of this.benches) {
        gsap.to(bench.position, {
          y: bench.position.y + RandomNum(1, 4) / 80,
          ease: Power1.easeInOut,
          repeat: -1,
          duration: RandomNum(2, 5),
          yoyo: true,
        });
      }
    }
  }

  animateFountain() {
    if (props.background == './3d/level-1-texture-2d-parallax-lvl1-edit.glb') {
      for (let i = 0; i < 100; i++) {
        setTimeout(
          () => {
            if (
              props.background ==
              './3d/level-1-texture-2d-parallax-lvl1-edit.glb'
            ) {
              // Au cas-où on change de niveau au cours de la boucle
              const duration = RandomNum(2, 5);
              const particleFountain = new Particle(duration);
              this.scene.add(particleFountain);

              setTimeout(() => {
                this.scene.remove(particleFountain);
                if (i == 99) {
                  this.animateFountain();
                }
              }, duration * 1000);
            }
          },
          RandomNum(0, 5) * 1000,
        );
      }
    }
  }

  render() {
    if (loopCounter < 3) {
      loopCounter += 1;
    } else {
      loopCounter = 0;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.sceneElements);

    if (
      this.intersects.length !== 0 &&
      previousHovered != this.intersects[0].object.name
    ) {
      alreadyChecked.value = false;
      this.currentIntersect = this.intersects[0];
      currentlyHovered.value = this.intersects[0].object.name;
      previousHovered = this.intersects[0].object.name;
      let isExisting = false;
      for (const dialog of props.dialogList) {
        if (this.intersects[0].object.name === dialog.name) {
          currentlyHovered.value = dialog.title;
          if (dialog.checked) {
            if (dialog.checked == true) {
              alreadyChecked.value = true;
            }
          }
          isExisting = true;
          this.canvas.style.cursor = 'pointer';
        }
      }
      if (isExisting == false) {
        // Masquer ce bloc pour checker le nom des objets 3D
        currentlyHovered.value = '';
        alreadyChecked.value = false;
        this.canvas.style.cursor = 'auto';
      }
    } else {
      this.currentIntersect = null;
    }

    if (
      keyState[81] &&
      this.camera.position.x > -0.85 &&
      !props.dialogVisible
    ) {
      this.camera.position.x -= 0.01;
      this.prota.position.x -= 0.01;
      this.prota.rotation.y = Math.PI;
      this.animateSprite('right');
    }
    if (keyState[68] && this.camera.position.x < 1 && !props.dialogVisible) {
      this.camera.position.x += 0.01;
      this.prota.position.x += 0.01;
      this.prota.rotation.y = 0;
      this.animateSprite('left');
    }

    if (
      !keyState[68] &&
      !keyState[81] &&
      this.prota.material !== textureProtaStill
    ) {
      this.prota.material = textureProtaStill;
      this.currentProtaSprite.running = false;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
</script>

<style lang="scss">
.wrapper {
  width: 100vw;
  position: fixed;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.directions {
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 16px;

  @media (min-width: 992px) {
    display: none;
  }

  &__el {
    height: 32px;
    width: 32px;
    cursor: pointer;

    &:active {
      path {
        fill: var(--c-txt);
      }
    }

    &--left {
      transform: rotate(180deg);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
