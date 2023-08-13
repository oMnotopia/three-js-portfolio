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

//Create line
const createLines = (startX, midX, finX) => {
  const lineMat = new THREE.LineBasicMaterial({color: 0xffff00});
  const points = [];
  points.push(new THREE.Vector3(-30, -10, startX));
  points.push(new THREE.Vector3(-20, 10, midX));
  points.push(new THREE.Vector3(-10, 30, finX));
  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(lineGeo, lineMat);
  scene.add(line);
  return line;
};

const line1 = createLines(-30, -20, -10);
const line2 = createLines(40, 20, 0);

const animate = () => {
  line1.rotateY(0.005);
  line2.rotateY(0.005);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);