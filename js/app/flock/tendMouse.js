define(['three', 'appData', 'collections/boids'], function ( THREE, appData, boids ) {

    var TendMouse = function ( boid ) {
        var mousePos = new THREE.Vector3( appData.mouseVector.x,appData.mouseVector.y,appData.mouseVector.z );
  
        return mousePos.sub( boid.element.position ).divideScalar(600);
    };

    return TendMouse;
});

