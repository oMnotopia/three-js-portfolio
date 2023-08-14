/* eslint-disable no-undef */
import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

//Colors that a cube at the end of the line can be
const cubeColors = [0xFF6961, 0xA7C7E7, 0x77DD77];

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
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.update();

//Create a cube that lines will rotate around
const cubeGeo = new THREE.BoxGeometry(0, 0, 0);
const cubeMat = new THREE.MeshBasicMaterial({color: 0xff0000});
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.rotation.x = 0.5;
cube.rotation.z = -0.5;
scene.add(cube);

//Create lines
const createLines = (startX, midX, endX, randomZ) => {
  const lineMat = new THREE.LineBasicMaterial({color: 0xffffff});
  const points = [];
  points.push(new THREE.Vector3(startX, 60, randomZ));
  points.push(new THREE.Vector3(midX, 25, randomZ));
  points.push(new THREE.Vector3(endX, -10, randomZ));
  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(lineGeo, lineMat);

  //Generate cube at the end of each line
  const cubeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const cubeMat = new THREE.MeshBasicMaterial({color: cubeColors[Math.floor(Math.random() * 3)]});
  const cube = new THREE.Mesh(cubeGeo, cubeMat);
  cube.position.x = endX;
  cube.position.y = -10;
  cube.position.z = randomZ;
  line.add(cube);

  scene.add(line);
  return line;
};

// //Axis helper
// const axesHelper = new THREE.AxesHelper(10);
// scene.add( axesHelper );

//Generate a specific number of lines with random variables passed to line generator
const lineArray = [];
for (let i = 0; i < 100; i ++) {

  //Generate random z position
  let randomZ = Math.floor(Math.random() * 60);
  //Generate random x positions
  let startNum = Math.floor(Math.random() * 50);
  let midNum = startNum - 15;
  let endNum = startNum - 30;


  //Evenly distribute values in 4 x-z coordinate zones;
  if (i < 25) {
    //Quadrant 1
    randomZ *= -1;
  } else if (i < 50) {
    //Quadrant 2
    randomZ *= -1;
    if (startNum > 30) {
      const valueStore = startNum;
      startNum = endNum * -1;
      midNum *= -1;
      endNum = valueStore * -1;
    }
  } else if (i < 75) {
    //Quadrant 3
    if (startNum > 30) {
      const valueStore = startNum;
      startNum = endNum * -1;
      midNum *= -1;
      endNum = valueStore * -1;
    }
  }

  lineArray.push(createLines(startNum, midNum, endNum, randomZ));
}

//Attach lines to cube for rotation
lineArray.forEach(line => cube.add(line));

const animate = () => {
  cube.rotateY(0.002);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);