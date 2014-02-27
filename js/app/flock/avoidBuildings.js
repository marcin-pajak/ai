define(['three', 'appData', 'collections/boids', 'collections/buildings'], function ( THREE, appData, boids, buildings ) {

    var AvoidBuildings = function ( boid ) {
        var vector = new THREE.Vector3( 0,0,0 );

        for ( var i = 0; i < buildings.length; i++ ) {
            var building = buildings[i],
                place = new THREE.Vector3( building.position.x,building.position.y,building.position.z ),
                distance = boid.element.position.distanceTo( place );

            if ( distance < 120) {
                var temp = place.sub( boid.element.position );
                vector.x += temp.x;
                vector.y += temp.y;
            }
        }

        return vector.multiplyScalar( -840 );
    };

    return AvoidBuildings;
});

