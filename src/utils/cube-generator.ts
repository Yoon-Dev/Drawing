import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from "three"

class CubeGenerator{
// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
// **********************************************
    public basecube: Mesh;
    public boxgeometry: BoxGeometry
    private sculpture: Group;

    constructor(a: number){
        this.basecube = this.createCube(a, true)
        this.sculpture = this.createSculpture(this.basecube, this.boxgeometry)
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// create a cube
    createCube(a: number, first: boolean = false): Mesh{

        let geometry: BoxGeometry;
        let material = new MeshBasicMaterial( { color: 0x00ffff } );
        let b: number = ((1 + Math.sqrt(5)) / 2) * a
        if(Math.round(Math.random()) === 1){
            geometry = new BoxGeometry(a, b, a)
            
        }else{
            geometry = new BoxGeometry(b, a, b)
        }

        if(first){
            this.boxgeometry = geometry
        }

        let basecube: Mesh = new Mesh( geometry, material );
        return basecube;

    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// create the sculture (group)
    createSculpture(basecube: Mesh, boxgeometry: BoxGeometry): Group{
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

        return group;
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// get the sculture propertie
    getSculpture(): Group{
        return this.sculpture
    }
// ----------------------------------------------
// end
}

export { CubeGenerator }