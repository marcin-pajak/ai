define(['three', 'appData', 'collections/boids'], function ( THREE, appData, boids ) {

    var Separation = function ( boid ) {
        var c = new THREE.Vector3( 0,0,0 );

        for ( var i = 0; i < boids.length; i++ ) {
            var b = boids[i];

            if ( b.id !== boid.id ) {
                var distance = boid.element.position.distanceTo( b.element.position );
                if ( distance < 40) {
                    var temp = new THREE.Vector3( 0,0,0 );
                    temp.subVectors( b.element.position, boid.element.position );
                    c.sub( temp );
                }
            }
        }

        return c.multiplyScalar( appData.separationFactor );
    };

    return Separation;
});

