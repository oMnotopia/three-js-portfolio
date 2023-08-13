/* eslint-disable no-undef */
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//Create initial scene
const scene = new THREE.Scene();

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Create Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

//Create a cube
const cubeGeo = new THREE.BoxGeometry(0, 0, 0);
const cubeMat = new THREE.MeshBasicMaterial({color: 0xff0000});
const cube = new THREE.Mesh(cubeGeo, cubeMat);
scene.add(cube);

//Create lines
const createLines = (startX, midX, finX, randomZ) => {
  const lineMat = new THREE.LineBasicMaterial({color: 0xffff00});
  const points = [];
  points.push(new THREE.Vector3(startX + 20, -10, randomZ));
  points.push(new THREE.Vector3(midX + 20, 10, randomZ));
  points.push(new THREE.Vector3(finX + 20, 30, randomZ));
  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(lineGeo, lineMat);
  scene.add(line);
  return line;
};

//Generate a specific number of lines with random variables passed to line generator
const lineArray = [];
for (let i = 0; i < 20; i ++) {
  //Generate true/false for whether value will be negative or positive
  const posNeg = Math.floor(Math.random() * 2);
  //Generate random z position
  let randomZ = Math.floor(Math.random() * 50);
  //Generate random x positions
  let startNum = Math.floor(Math.random() * 50);
  let endNum = startNum - Math.floor(Math.random() * startNum);
  let midNum = endNum + ((startNum - endNum) / 2);

  if (posNeg === 1) {
    randomZ *= -1;
  } else {
    startNum *= -1;
    endNum *= -1;
    midNum *= -1;
  }
  console.log(startNum, midNum, endNum, randomZ);
  lineArray.push(createLines(startNum, midNum, endNum));
}

//Attach lines to cube for rotation
lineArray.forEach(line => cube.add(line));

const animate = () => {
  cube.rotateY(0.005);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);