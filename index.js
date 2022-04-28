import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

 //creating scene
 const scene = new THREE.Scene();
 let loader2 = new THREE.TextureLoader();
 loader2.load("./space-bg.jpg", (texture)=>{
     scene.background = texture;
 })

 //add camera

 const camera =  new THREE.PerspectiveCamera(
     75,
     window.innerWidth/window.innerHeight
 );

 //renderer

 const renderer =  new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

 //add geometry
 const geometry = new THREE.SphereGeometry(1.5,64,64);
 const material = new THREE.MeshBasicMaterial();
 const cube = new THREE.Mesh(geometry,material);
 
 const loader = new THREE.TextureLoader();
 loader.load('./sun-uv-map.jpg', (texture)=>{
    material.map = texture;
    animate();
 })

 scene.add(cube);

 camera.position.z = 12;;

 const controls = new OrbitControls(camera, renderer.domElement)
 
 //min & max distance to zoom with scroll
 controls.minDistance = 3;
 controls.maxDistance = 20;

 //factor de inercia, cuanto "le cuesta" al objeto rotar o moverse con mi mouse
 controls.enableDamping = true;
 controls.dampingFactor = 0.5; // con factor 2 da un efecto de vibracion
 
 //angulo de rotacion maximo permitido
 //controls.maxPolarAngle = Math.PI / 10; 
 
 //en false permite mover el objeto en los planos (X,Z). Por defecto
 // esta en true, lo que me permite mover el objeto en los planos (X,Y)
 controls.screenSpacePanning = false;

 addEventListener('resize',()=>{
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
    renderer.render(scene,camera);
 })

 //animation
 const animate = function(){
     requestAnimationFrame(animate);
     cube.rotation.x += 0.005;
     cube.rotation.y += 0.005;
     renderer.render(scene,camera);
 }
