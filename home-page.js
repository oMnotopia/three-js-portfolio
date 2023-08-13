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

//Create plane
const geomery = new THREE.PlaneGeometry(20, 20);
const material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
const plane = new THREE.Mesh(geomery, material);
plane.rotation.set(-Math.PI / 2, 0, 0);


//Create line
const lineMat = new THREE.LineBasicMaterial({color: 0xffff00});
const points = [];
points.push(new THREE.Vector3(-30, -10, 0));
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(10, 10, 0));
const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeo, lineMat);


//Attach line to plane
scene.add(line);

//Add objects to scene
scene.add(plane);

const animate = () => {
  //rotate the plane
  plane.rotateZ(0.005);
  line.rotateY(0.005);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(animate);