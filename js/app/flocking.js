define(['three', 'underscore', 'appData', 'userData', 'collections/specials',
        'flock/cohesion', 'flock/separation', 'flock/alignment', 'flock/avoidMouse', 'flock/avoidBuildings', 'flock/tendMouse', 'flock/tendLeader'], 
        function ( THREE, _, appData, userData, specials, Cohesion, Separation, Alignment, AvoidMouse, AvoidBuildings, TendMouse, TendLeader ) {

    var Flocking = function () {
        var self = this;

        // Flocking acc
        self.sum = new THREE.Vector3( 0,0,0 );
    };

    Flocking.prototype.update = function ( boid ) {
        var self = this;
        
        self.sum.x = 0;
        self.sum.y = 0;
        self.sum.z = 0;
       
        if ( userData.userFlocking ) {
            try {
                self.sum = eval( userData.userFlocking );
            }
            catch ( error ) {
                console.log( 'Błąd w funkcji flocking użytkownika: ', error );
            }
        }
        else {
            self.sum = appData.flockingUpdateFunction( boid );
        }        
        
        if ( appData.isTendMouse && specials.leader && specials.leader.id === boid.id ) {
            self.sum.add( TendMouse( boid ).multiplyScalar(100) );
        }

        if ( userData.userFunction  ) {
            try {
                self.sum.add( eval( userData.userFunction ) );
            }
            catch ( error ) {
                console.log( 'Błąd w funkcji behaviour użytkownika: ', error );
            }
        }

    };

    return Flocking;
});

