<template>
    <div class="wrapper" ref="wrapper">
        <canvas class="canvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from "gsap";

const emit = defineEmits(['openTextBox']);

const inventory = inject('inventory');

// Random

function RandomNum(min, max){
    const n = min + (Math.random() * ((max + 1) - min));
    return n;
}

function RandomNumNoCenter(min, max){
    let n = min + (Math.random() * ((max + 1) - min));
    const average = (max + min) / 2;
    const minMiddleRange = average - 3;
    const maxMiddleRange = average + 3;
    while(n < maxMiddleRange && n > minMiddleRange){
        n = min + (Math.random() * ((max + 1) - min));
    }
    return n;
}

function RandomNumRound(min, max){
  return Math.floor(RandomNum(min, max));
}

// Three.js

const wrapper = ref(null);
const canvas = ref(null);
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

    // Create our 3D viewer
    const myViewer = new Viewer(canvas.value, sizes);
    myViewer.populate();
    myViewer.animate();
});


const textureLoader = new THREE.TextureLoader();
const textureGlitch = textureLoader.load('./3d/textures/glitch.png');
const planeMaterial = new THREE.MeshBasicMaterial({ map: textureGlitch });
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

    // window.addEventListener('keydown', (e) => {
    //     if(e.keyCode == 81 && this.camera.position.x > -0.85){
    //         this.camera.position.x -= 0.05;
    //     }else if(e.keyCode == 68 && this.camera.position.x < 1){
    //         this.camera.position.x += 0.05;
    //     }
    // })


    this.controls = new PointerLockControls(this.camera, this.canvas);

    // this.controls = new OrbitControls(this.camera, this.canvas);
    // this.controls.enablePan = false;
    // this.controls.enableZoom = false;
    // this.controls.rotateSpeed = 0.1;
    // this.controls.minAzimuthAngle = - (Math.PI * 0.1);
    // this.controls.maxAzimuthAngle = (Math.PI * 0.1);
    // this.controls.minPolarAngle = (Math.PI * 0.3);
    // this.controls.maxPolarAngle = (Math.PI * 0.7);


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
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    const sceneElements = [];
    dracoLoader.setDecoderPath('/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(
        '/3d/level-1-texture-2d-parallax-lvl1.glb',
        (gltf) =>
        {
            const children = [...gltf.scene.children]
            for(const child of children)
            {
                child.position.z = child.position.z + 8
                this.scene.add(child)
                sceneElements.push(child);
            }
            console.log(sceneElements);
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


    // Raycaster
    this.raycaster = new THREE.Raycaster()
    this.currentIntersect = null;
    this.lastHovered = null;

    // Add to inventory    
    window.addEventListener('click', () => {
            if(this.currentIntersect){
                inventory.value.addItem(this.currentIntersect.object.name);
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

render() {

    window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX / sizes.w * 2 - 1
        this.mouse.y = - (e.clientY / sizes.h) * 2 + 1;
    })
    this.raycaster.setFromCamera(this.mouse, this.camera)
    this.intersects = this.raycaster.intersectObjects([this.cube, this.cube2])

    if(this.intersects.length !== 0){
        if(this.currentIntersect == null){
            this.intersects[0].object.material.color.set('#ffffff')
            this.lastHovered = this.intersects[0].object;
        }
        this.currentIntersect = this.intersects[0];
    }else{
        if(this.currentIntersect !== null){
            this.lastHovered.material.color.set('#ff0000');
        }
        this.currentIntersect = null;
    }

    if (keyState[81] && this.camera.position.x > -0.85){
        this.camera.position.x -= 0.01;
    }    
    if (keyState[68] && this.camera.position.x < 1){
        this.camera.position.x += 0.01;
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