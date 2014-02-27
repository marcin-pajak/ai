define([
    'jquery',
    'underscore',
    'backbone',
    'three',
    'appData',
    'appHelpers',
    'modules/boid',
    'collections/boids',
    'collections/buildings',
    'collections/specials',
    'flock/cohesion', 'flock/separation', 'flock/alignment', 'flock/avoidMouse', 'flock/avoidBuildings', 'flock/tendMouse', 'flock/tendLeader'
], function ($, _, Backbone, THREE, appData, appHelpers, Boid, boids, buildings, specials, Cohesion, Separation, Alignment, AvoidMouse, AvoidBuildings, TendMouse, TendLeader) {
    'use strict';

    var BoidsBuildings = Backbone.View.extend({

        // main objects
        scene               : null,
        camera              : null,
        controls            : null,

        events              : {
        },


        /**
         * Initialize view
         */
        initialize: function () {
            var self = this;

            // custom behaviour
            self.setCustomFlocking();

            // scene
            self.scene = appHelpers.getDefaultScene();

            // camera
            self.camera = appHelpers.getDefaultCamera();

            // controls
            self.controls = appHelpers.getDefaultControls( this.camera );

            // light
            appHelpers.setLights( this.scene );

            // propogate world
            self.drawWorld();

            return self;
        },


        _update: function () {

            return this;
        },


        _render: function () {
            var self = this;

            if ( appData.updateQty ) {
                appData.updateQty = false;
                this.updateGroup();
            }

            if ( appData.isLeaderChanged ) {
                appData.isLeaderChanged = false;
                this.redrawLeader();
            }

            if ( appData.isBuildingsChanged ) {
                appData.isBuildingsChanged = false;
                this.redrawBuildings();
            }

            for (var i = 0; i < boids.length; i++) {
               boids[i].updateBoid();
            }

            return self;
        },


        /**
         * Set custom flocking behaviour
         */
        setCustomFlocking: function () {
            appData.flockingUpdateFunction = function ( boid ) {
                var vector = new THREE.Vector3( 0,0,0 );

                vector
                    .add( Cohesion( boid ) )
                    .add( Separation( boid ) )
                    .add( Alignment( boid ) )
                    .add( AvoidBuildings( boid ) )
                ;

                if ( appData.isAvoidMouse ) {
                    vector.add( AvoidMouse( boid ) );
                }

                if ( appData.isTendMouse && !appData.isLeader ) {
                    vector.add( TendMouse( boid ) );
                }

                if ( appData.isLeader ) {
                    vector.add( TendLeader( boid ) );
                }

                return vector;
            }
        },


        /**
         * Draw all world's objects
         */
        drawWorld: function () {
            appHelpers.drawDefaultGroup( new THREE.CubeGeometry( 20,20,20 ), this.scene );
        },


        /**
         * Redraw boids
         */
        updateGroup: function () {
            var self = this;

            if ( boids.length !== appData.groupQty && boids.length > appData.groupQty ) {
                self.removeBoids();
            }
            else {
                self.addBoids();
            }
        },


        /**
         * Add new boids
         */
        addBoids: function () {
            for ( var i = boids.length; i < appData.groupQty; i ++ ) {
                var boid = appHelpers.getBoid( i, new THREE.CubeGeometry( 20,20,20 ) );
                
                boids.push( boid );
                this.scene.add( boid.element );
            }
        },


        /**
         * Remove all boids
         */
        removeBoids: function () {
            for ( var i = boids.length-1; i > appData.groupQty-1; i -- ) {
                this.scene.remove( boids[i].element );
                boids.splice(i, 1);
            }
        },


        /**
         * Redraw Leader
         */
        redrawLeader: function () {
            var self = this,
                temp = appData.groupQty;
            appData.groupQty = 0;
            self.removeBoids( boids.length );
            appData.groupQty = temp;
            appHelpers.drawDefaultGroup( new THREE.CubeGeometry( 20,20,20 ), self.scene );
        },


        /**
         * Draw buildings
         */
        drawBuildings: function () {
            appHelpers.drawBuilding( new THREE.CubeGeometry( 100,100,500 ), new THREE.Vector3( 0,0,0 ), this.scene );
            appHelpers.drawBuilding( new THREE.CubeGeometry( 100,100,500 ), new THREE.Vector3( 200,200,0 ), this.scene );
            appHelpers.drawBuilding( new THREE.CubeGeometry( 100,100,500 ), new THREE.Vector3( window.innerWidth-500, window.innerHeight/2,0 ), this.scene );
            appHelpers.drawBuilding( new THREE.CubeGeometry( 100,100,500 ), new THREE.Vector3( -window.innerWidth+300, window.innerHeight/2,0 ), this.scene );
            appHelpers.drawBuilding( new THREE.CubeGeometry( 100,100,500 ), new THREE.Vector3( -window.innerWidth/2 , -window.innerHeight/2,0 ), this.scene );  
        },


        /**
         * Remove all buildings
         */
        removeBuildings: function () {
            for ( var i = buildings.length-1; i >= 0; i -- ) {
                this.scene.remove( buildings[i] );
                buildings.splice(i, 1);
            }
        },


        /**
         * Redraw Buildings
         */
        redrawBuildings: function () {
            if ( appData.isBuildings ) {
                this.drawBuildings();
            }
            else {
                this.removeBuildings();
            }
        }



    });

    return BoidsBuildings;
});