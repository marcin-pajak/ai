define(['three', 'appData', 'collections/boids'], function ( THREE, appData, boids ) {

    var AvoidMouse = function ( boid ) {
        var mousePos = new THREE.Vector3( appData.mouseVector.x,appData.mouseVector.y,appData.mouseVector.z ),
            distanceToPoint = boid.element.position.distanceTo( appData.mouseVector );

        if ( distanceToPoint < 100 ) {
            return mousePos.sub( boid.element.position ).multiplyScalar( -840 );
        }
        else {
            return new THREE.Vector3( 0,0,0 );
        }
    };

    return AvoidMouse;
});

