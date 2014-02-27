define(['three'], function ( THREE ) {
    'use strict';

    // Variables for generator
    var appData = {

        // PARAMETERS
        boidsNumber:                50,

        maxVelocity:                6,

        groupQty:                   100,

        cohesionFactor:             1.1,
        alignmentFactor:            1,
        separationFactor:           1,

        isAvoidMouse:               true,
        isTendMouse:                false,
        isLeader:                   false,
        isLeaderChanged:            false,

        isBuildingsChanged:         false,
        isBuildings:                false,

        updateQty:                  false,

        // FLOCKING FUNCTION
        flockingUpdateFunction:     null,

        // HELPERS
        mouseVector:                new THREE.Vector3( 0,0,0 )
    };

    window.appData = appData;

    return appData;
});