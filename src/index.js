import _ from 'lodash';
import { CubeGenerator } from './utils/cube-generator.js'


var THREE = require('three');

var scene, camera, renderer, cubeA, cubeB, cubeC, group;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    // var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );


    console.log(new CubeGenerator(3), typeof(new CubeGenerator(3)))
    // scene.add( new CubeGenerator(3) );


    // controls

    // var controls = new OrbitControls( camera, renderer.domElement );
    // controls.minDistance = 20;
    // controls.maxDistance = 50;
    // controls.maxPolarAngle = Math.PI / 2;
    
    // // helper

    // scene.add( new THREE.AxesHelper( 20 ) )    

    camera.position.z = 5;

    window.addEventListener( 'resize', onResize, false );
}

function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    
    // group.rotation.x += 0.01;
    // group.rotation.y += 0.01;
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

init();
// animate();