define(['three', 'appData', 'collections/boids'], function ( THREE, appData, boids ) {

    var Alignment = function ( boid ) {
        var pv = new THREE.Vector3( 0,0,0 );

        for ( var i = 0; i < boids.length; i++ ) {
            var b = boids[i];

            if ( b.id !== boid.id) {
                pv.add( b.velocity );
            }
        }

        pv.divideScalar( boids.length - 1 );
        pv.sub( boid.velocity );
        pv.divideScalar( 8 );

        return pv.multiplyScalar( appData.alignmentFactor );;
    };

    return Alignment;
});

