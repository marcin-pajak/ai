define(['three', 'appData', 'collections/boids', 'collections/specials'], function ( THREE, appData, boids, specials ) {

    var TendLeader = function ( boid ) {
        if ( specials.leader ) {
            var pos = specials.leader.element.position;
            var place = new THREE.Vector3( pos.x,pos.y,pos.z );

            place.sub( boid.element.position );

            return place.divideScalar( 100 );
        }
    };

    return TendLeader;
});

