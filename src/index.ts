import { Scene, PerspectiveCamera, WebGLRenderer, Color, Group, Clock, TextureLoader, RepeatWrapping, LoadingManager, ShaderMaterial } from "three"
import { CubeGenerator } from './class/cube-generator'
// init variable with large scope
let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer, group: Group, clock: Clock, cube: CubeGenerator;

function init(){
    scene = new Scene();
    clock = new Clock();
    scene.background = new Color( 0xffffff );
    camera = new PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    

    let taille = Math.random() * (3 - 1) + 1
    cube = new CubeGenerator(3)
    group = new Group
    console.log(cube)
    group.add(cube.getCube())
    scene.add( group );


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
    let material: ShaderMaterial = cube.basecube.material as ShaderMaterial
    material.uniforms.time.value = clock.elapsedTime
    // group.rotation.x += 0.01;
    group.rotation.y += 0.01;
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

init();
animate();