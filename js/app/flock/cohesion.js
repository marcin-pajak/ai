define(['three', 'appData', 'collections/boids'], function ( THREE, appData, boids ) {

    var Cohesion = function ( boid ) {
        var pc = new THREE.Vector3( 0,0,0 );

        for ( var i = 0; i < boids.length; i++ ) {
            var b = boids[i];

            if ( b.id !== boid.id) {
                pc.add( b.element.position );
            }
        }

        pc.divideScalar( boids.length );
        pc.sub( boid.element.position );
        pc.normalize();
        pc.divideScalar(3);

        return pc.multiplyScalar( appData.cohesionFactor );
    };

    return Cohesion;
});

