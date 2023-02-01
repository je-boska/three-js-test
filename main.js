import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// SCENE, CAMERA AND RENDERER

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

document.body.appendChild(renderer.domElement);

// CUBE

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y += 1;
cube.castShadow = true;
scene.add(cube);

// PLANE

const planeGeometry = new THREE.PlaneGeometry(10, 10, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x -= Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// LIGHTS

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 2, 2);
directionalLight.castShadow = true;
scene.add(directionalLight);

directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default

const ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);

// HELPER GRID

const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions, 0xffffff);
scene.add(gridHelper);

// RECURSIVE ANIMATION FUNCTION / GAME TICK

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
