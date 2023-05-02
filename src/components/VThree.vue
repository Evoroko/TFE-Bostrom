<template>

    <VLoading
        :class="{ 'loading--hide': loadingFinished == false }"
        :percentage="loadingPercentage"
    />
    <div class="wrapper" ref="wrapper">
        <VHover
            v-if="currentlyHovered && !props.dialogVisible"
            :mouse-x="mouseX"
            :mouse-y="mouseY"
            >
            {{ currentlyHovered }}
        </VHover>
        <canvas class="canvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from "gsap";
import VHover from './VHover.vue'
import VLoading from './VLoading.vue'

const props = defineProps({
    dialogVisible: {
        type: Boolean,
        required: false
    },
    dialogList:{
        type: Array,
        required: false
    },
    background:{
        type: String,
        required: false
    }
})
const emit = defineEmits(['openTextBox']);
const inventory = inject('inventory');
const currentlyHovered = ref('');
const loadingFinished = ref(false);
const loadingPercentage = ref(0);
let loopCounter = 0;

// Random
function RandomNum(min, max){
    const n = min + (Math.random() * ((max + 1) - min));
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

onMounted(() => {
    // Get the DOM elements
    canvas.value = document.querySelector('.canvas');
    sizes.w = window.innerWidth;
    sizes.h = window.innerHeight;

    document.addEventListener('mousemove', (e) => {
        mouseX.value = e.clientX;
        mouseY.value = e.clientY;
    })

    // Create our 3D viewer
    const myViewer = new Viewer(canvas.value, sizes);
    myViewer.populate();
    myViewer.animate();

    

    watch(() => props.background, (first, second) => {
        myViewer.replaceAll();
    })
    
});
/**
 * Loading
 * */
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        loadingFinished.value = true;
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        loadingPercentage.value = Math.round(itemsLoaded / itemsTotal * 100);
    }
);





const gltfLoader = new GLTFLoader(loadingManager);
const dracoLoader = new DRACOLoader(loadingManager);
const textureLoader = new THREE.TextureLoader(loadingManager);
const textureGlitch = textureLoader.load('/3d/textures/glitch.png');
const protaStill = textureLoader.load('/img/sprite-anim/0.png');
const protaRunning = 
    [
        textureLoader.load('/img/sprite-anim/1.png'),
        textureLoader.load('/img/sprite-anim/2.png'),
        textureLoader.load('/img/sprite-anim/3.png'), 
        textureLoader.load('/img/sprite-anim/4.png'),
        textureLoader.load('/img/sprite-anim/5.png'),
        textureLoader.load('/img/sprite-anim/6.png'),
        textureLoader.load('/img/sprite-anim/7.png'),
        textureLoader.load('/img/sprite-anim/8.png')
    ]
const planeMaterial = new THREE.MeshBasicMaterial({ map: textureGlitch });
const textureProtaStill = new THREE.MeshBasicMaterial({ map: protaStill, transparent: true, side: THREE.DoubleSide });
const textureProtaRunning = 
    [
        new THREE.MeshBasicMaterial({ map: protaRunning[0], transparent: true, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: protaRunning[1], transparent: true, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: protaRunning[2], transparent: true, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: protaRunning[3], transparent: true, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: protaRunning[4], transparent: true, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: protaRunning[5], transparent: true, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: protaRunning[6], transparent: true, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: protaRunning[7], transparent: true, side: THREE.DoubleSide })
    ];
const planeGeometry = new THREE.PlaneGeometry(1, 1);

var keyState = {};
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);



class Glitch{
  constructor(){
    this.mesh = new THREE.Mesh(
      planeGeometry,
      planeMaterial
    );
    this.mesh.position.set(RandomNum(0, 100), RandomNum(0, 30), RandomNum(2, 100));
    this.mesh.scale.set(RandomNum(2, 3), RandomNum(2, 4));
    this.emptyIndicator = false;
    this.changePosition();
    return this.mesh;
  }
    changePosition(){
        setTimeout(() =>{
            this.mesh.position.set(RandomNum(-10, 10), RandomNum(0, 10), RandomNum(-100, 100));
            this.changePosition();
        }, 1000)
    }
}

class InteractiveObject{
    constructor(name){
        const object = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial( {color: 0x00ff00} )
        )
        object.name = name;
        return object;
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
        antialias: true
    });
    this.renderer.setSize(sizes.w, sizes.h);
    this.renderer.setPixelRatio(sizes.dpr);
    this.renderer.outputEncoding = THREE.sRGBEncoding;


    // Camera
    this.camera = new THREE.PerspectiveCamera(30, sizes.w / sizes.h, 1, 10000);
    this.camera.position.z = 10.64;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#ffffff');
    this.scene.add(this.camera);

    // Resize
    window.addEventListener('resize', () => {
        sizes.w = window.innerWidth;
        sizes.h = window.innerHeight;
        this.renderer.setSize( sizes.w, sizes.h );

        this.camera.aspect = sizes.w / sizes.h;
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    })
}

populate() {
    // Light
    this.light = new THREE.DirectionalLight('#ffffff', 1);
    this.light.position.set(1, 3, 2);
    this.ambientLight = new THREE.AmbientLight('#ffffff', 0.8);

    this.scene.add(this.light, this.ambientLight);

    // Fog
    this.fog = new THREE.Fog('#4E363A', 1, 225)
    this.scene.fog = this.fog


    // Model loader
    this.sceneElements = [];
    dracoLoader.setDecoderPath('/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(
        props.background,
        (gltf) =>
        {
            const children = [...gltf.scene.children]
            for(const child of children)
            {
                child.position.z = child.position.z + 8
                this.scene.add(child)
                this.sceneElements.push(child);
            }
        }
    )

    // Test cube
    this.cube = new InteractiveObject('cube');
    this.cube2 = new InteractiveObject('cube2');
    this.cube2.position.set(-1,-1, 0)

    // this.scene.add(this.cube, this.cube2);

    // Glitches
    // for(let i = 0; i<30; i++){
    //   this.glitch = new Glitch();
    //   this.scene.add(this.glitch);
    // }

    // Model running
    this.prota = new THREE.Mesh(
            new THREE.PlaneGeometry(0.2, 0.35),
            textureProtaStill
        )

    this.prota.position.set(0, -0.1, 9.2);
    this.currentProtaSprite = {
        running: false,
        status: 0,
        previousSpriteFinished: false
    };

    this.scene.add(this.prota);


    // Raycaster
    this.raycaster = new THREE.Raycaster()
    this.currentIntersect = null;
    // this.lastHovered = null;

    // Add to inventory    
    this.canvas.addEventListener('click', () => {
        this.currentIntersect = this.intersects[0];
            if(this.currentIntersect && !props.dialogVisible){
                emit('openTextBox', this.currentIntersect.object.name);
            }
        }
    )

    // Mouse
    this.mouse = new THREE.Vector2(300, 300);
}

animate() {
    gsap.ticker.add( () => {
        this.render();
    } );
}

animateSprite(direction) {
    if(this.currentProtaSprite.running == false){
        this.currentProtaSprite.running = true;
        this.prota.material = textureProtaRunning[0];
    }

    if(loopCounter == 0){
        if(this.currentProtaSprite.running = true && this.currentProtaSprite.status < textureProtaRunning.length){
            this.prota.material = textureProtaRunning[this.currentProtaSprite.status];
            this.currentProtaSprite.status += 1;
        }else if(this.currentProtaSprite.running = true && this.currentProtaSprite.status == textureProtaRunning.length){
            this.currentProtaSprite.status = 0;
        }
    }
}

replaceAll() {
    loadingPercentage.value = 0;
    loadingFinished.value = false;
    setTimeout(() => {
        while (this.scene.children.length)
        {
            this.scene.remove(this.scene.children[0]);
        }
        this.populate();
    }, 300)
}

render() {

    if(loopCounter < 3){
        loopCounter += 1;
    }else{
        loopCounter = 0;
    }

    window.addEventListener('mousemove', (e) => {
        this.mouse.x = mouseX.value / sizes.w * 2 - 1
        this.mouse.y = - (mouseY.value / sizes.h) * 2 + 1;
    })
    this.raycaster.setFromCamera(this.mouse, this.camera)
    this.intersects = this.raycaster.intersectObjects(this.sceneElements)

    if(this.intersects.length !== 0){ // removed "&& this.lastHovered !== this.intersects[0].object" because if it missed the object then it never showed on mouse hover
        // if(this.currentIntersect == null){
        //     this.lastHovered = this.intersects[0].object;
        // }
        this.currentIntersect = this.intersects[0];
        currentlyHovered.value = this.intersects[0].object.name;
        let isExisting = false;
        for(let dialog of props.dialogList){
            if(this.intersects[0].object.name === dialog.name){
                currentlyHovered.value = dialog.title;
                isExisting = true;
                this.canvas.style.cursor = 'pointer';
            }
        }
        if(isExisting == false){
            currentlyHovered.value = '';
            this.canvas.style.cursor = 'auto';
        }
        // console.log(this.currentIntersect.object.name)
    }else{
        // if(this.currentIntersect !== null){
        //     // this.lastHovered.material.color.set('#ff0000');
        // }
        this.currentIntersect = null;
    }

    if (keyState[81] && this.camera.position.x > -0.85 && !props.dialogVisible){
        this.camera.position.x -= 0.01;
        this.prota.position.x -= 0.01;
        this.prota.rotation.y = Math.PI;
        this.animateSprite("right");
    }    
    if (keyState[68] && this.camera.position.x < 1 && !props.dialogVisible){
        this.camera.position.x += 0.01;
        this.prota.position.x += 0.01;
        this.prota.rotation.y = 0;
        this.animateSprite("left");
    }

    if(!keyState[68] && !keyState[81] && this.prota.material !== textureProtaStill){
        this.prota.material = textureProtaStill;
        this.currentProtaSprite.running = false;
    }

    
    
    this.renderer.render(this.scene, this.camera);
}
}
</script>

<style lang="scss">

.wrapper{
    width: 100vw;
    position: fixed;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.canvas{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

</style>