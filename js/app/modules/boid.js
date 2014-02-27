define( ['three', 'appData', 'flocking'], function ( THREE, appData, Flocking ) {

    var Boid = function ( id, velocity ) {
        var self = this;

        // Unique ID
        self.id = id;

        // THREE object
        self.element = null;

        // Velocity
        self.velocity = velocity;

        // Acceleration
        self.acc = new Flocking( this );
    };


    /**
     * Update position every frame
     */
    Boid.prototype.updateBoid = function () {
        var self = this;

        self.acc.update( self );
        self.velocity.add( self.acc.sum );

        self.boudPosition();
        self.limitVelocity();

        self.element.position.add( self.velocity );
    };


    /**
     * Check position
     */
    Boid.prototype.boudPosition = function () {
        var self = this,
            strength = 5,
            safe = 100,
            pos = self.element.position,
            vel = self.velocity,
            wHeight = window.innerHeight;
            wWidth = window.innerWidth;

        // X axe bounds
        if ( pos.x < -wWidth ) {
            vel.x *= -strength;
        }
        else if ( pos.x > wWidth ) {
            vel.x *= -strength;
        }

        if ( pos.x < -wWidth-safe ) {
            pos.x = -wWidth+strength;
            vel.x *= -strength;
        }
        else if ( pos.x > wWidth+safe ) {
            pos.x = wWidth-strength;
            vel.x *= -strength;
        }

        // Y axe bounds
        if ( pos.y < -wHeight ) {
            vel.y *= -strength;
        }
        else if ( pos.y > wHeight ) {
            vel.y *= -strength;
        }

        if ( pos.y < -wHeight-safe ) {
            pos.y = -wHeight+strength;
            vel.y *= -strength;
        }
        else if ( pos.y > wHeight+safe ) {
            pos.y = wHeight-strength;
            vel.y *= -strength;
        }

        var zLimit = wHeight;
        // Z axe bounds
        if ( pos.z < -zLimit ) {
            vel.z *= -strength;
        }
        else if ( pos.z > zLimit ) {
            vel.z *= -strength;
        }

        if ( pos.y < -zLimit-safe ) {
            pos.y = -zLimit+strength;
            vel.y *= -strength;
        }
        else if ( pos.y > zLimit+safe ) {
            pos.y = zLimit-strength;
            vel.y *= -strength;
        }
    };


    /**
     * Don't let them fly too fast :)
     */
    Boid.prototype.limitVelocity = function () {
        var self = this,
            vel = self.velocity,
            velLength = Math.sqrt( vel.x * vel.x + vel.y * vel.y + vel.z * vel.z );

        velLength = appData.maxVelocity / velLength;
        vel.x *= velLength;
        vel.y *= velLength;
        vel.z *= velLength;
    };


    return Boid;
});