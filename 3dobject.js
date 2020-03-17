var THREE = require('three');

var scene, camera, renderer, cubeA, cubeB, group;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog(0x000000)
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry(2, 1, 6);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cubeA = new THREE.Mesh( geometry, material );
    cubeB = new THREE.Mesh( geometry, material );
    // cubeB.position.set(-10, 0, 0)
    group = new THREE.Group()
    group.add( cubeA )
    group.add( cubeB )

    scene.add( group );


    // controls

    var controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;
    
    // helper

    scene.add( new THREE.AxesHelper( 20 ) )    

    camera.position.z = 5;

    window.addEventListener( 'resize', onResize, false );
}

function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    
    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

init();
animate();