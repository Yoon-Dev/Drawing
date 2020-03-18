var THREE = require('three');

export class CubeGenerator{
// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
// **********************************************
    constructor(a){
        this.basecube = this.createCube(a)
        this.sculpture = this.createSculpture(this.basecube)
        return this.sculpture
    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// create a cube
    createCube(a){

        let basecube
        let b = ((1 + Math.sqrt(5)) / 2) * a
        if(Math.round(Math.random()) === 1){
            basecube = new THREE.BoxGeometry(a, b, a)
            
        }else{
            basecube = new THREE.BoxGeometry(b, a, b)
        }
        
        return basecube

    }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// create the sculture (group)
    createSculpture(basecube){
        console.log(basecube, typeof(basecube))
        // to get a contact between each cube
        let limite = {
            xlimite: basecube.parameters.width,
            ylimite: basecube.parameters.height,
            zlimite: basecube.parameters.depth
        }
        // we need to return this group 
        let group = new THREE.Group()
        // let nbrcube = Math.floor(Math.random() * (Math.abs(x) - Math.abs(y) +1)) + Math.abs(z);
        // console.log(nbrcube)
        // if(nbrcube <= 0){
            // group.add(basecube)
        // }else{
        //     for(let i = 0; i <= nbrcube; i++){
        //         // create a  new cube
        //         let newcube = THREE.BoxGeometry(x, y , z)
        // }

        return group

    }
// ----------------------------------------------
// end
}