import { BoxBufferGeometry, Group, Mesh, MeshBasicMaterial, ShaderMaterial, TextureLoader, RepeatWrapping } from "three"

class CubeGenerator{
// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
// **********************************************
    public basecube: Mesh;
    public boxgeometry: BoxBufferGeometry
    private multicube: Group;
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    constructor(a: number){
        this.basecube = this.createCube(a, true)
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// create a cube
    createCube(a: number, first: boolean = false): Mesh{

        let geometry: BoxBufferGeometry;
        
        let b: number = ((1 + Math.sqrt(5)) / 2) * a
        if(Math.round(Math.random()) === 1 || first){
            geometry = new BoxBufferGeometry(a, b, a)
            
        }else{
            geometry = new BoxBufferGeometry(b, a, b)
        }

        if(first){
            this.boxgeometry = geometry
        }

        let basecube: Mesh = new Mesh( geometry, this.createTexture() );
        return basecube;

    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// create the sculture (group)
    createMultiCube(basecube: Mesh, boxgeometry: BoxBufferGeometry){
        // to get a contact between each cube
        let limite = {
            xlimite: boxgeometry.parameters.width,
            ylimite: boxgeometry.parameters.height,
            zlimite: boxgeometry.parameters.depth
        }
        // we need to return this group 
        let group: Group = new Group()
        group.add(basecube)
        let nbrcube: number = Math.round( Math.random() * (Math.abs(limite.xlimite) - Math.abs(limite.ylimite) +1) + Math.abs(limite.zlimite));
        if(nbrcube > 0){  
            for(let i = 0; i <= nbrcube; i++){
                // create a  new cube
                let newcube = this.createCube(1)
                let x: number = Math.random() * ((limite.xlimite - limite.xlimite +1) -limite.xlimite)
                let y: number = Math.random() * ((limite.ylimite - limite.ylimite +1) -limite.ylimite)
                let z: number = Math.random() * ((limite.zlimite - limite.zlimite +1) -limite.zlimite)
                console.log(limite.xlimite, limite.ylimite, limite.zlimite)
                console.log(x, y, z)
                newcube.position.set(x, y, z)
                group.add(newcube)
            }
        }
        this.multicube = group
    }


// create shader material
    createTexture(): ShaderMaterial{

        // let material = new MeshBasicMaterial( { color: 0x000000 } );
        let uniforms = {
            "time": { value: 1.0 },
            "colorTexture": { value: new TextureLoader().load( './textures/texture-bois.jpg' ) }
        }
        uniforms[ "colorTexture" ].value.wrapS = uniforms[ "colorTexture" ].value.wrapT = RepeatWrapping;
        
        let material: ShaderMaterial = new ShaderMaterial({
            uniforms: uniforms,
            vertexShader:
            `
            varying vec2 vUv;

            void main()
            {
                vUv = uv;
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_Position = projectionMatrix * mvPosition;
            }  

            `,

            fragmentShader: 
            `
            uniform float time;

			uniform sampler2D colorTexture;

			varying vec2 vUv;

			void main( void ) {

				vec2 position = - 1.0 + 2.0 * vUv;

				float a = atan( position.y, position.x );
				float r = sqrt( dot( position, position ) );

				vec2 uv;
				uv.x = cos( a ) / r;
				uv.y = sin( a ) / r;
				uv /= 10.0;
				uv += time * 0.05;

				vec3 color = texture2D( colorTexture, uv ).rgb;

				gl_FragColor = vec4( color * r * 1.5, 1.0 );

			}`

        
        })
    
        return material
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// get the sculture propertie
    getMultiCube(): Group{
        return this.multicube
    }
// get the sculture propertie
    getCube(): Mesh{
        return this.basecube
    }
// ----------------------------------------------
// end
}

export { CubeGenerator }