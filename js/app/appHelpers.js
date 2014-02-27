define([
    'jquery',
    'underscore',
    'backbone',
    'three',
    'appData',
    'modules/boid',
    'collections/boids',
    'collections/buildings',
    'collections/specials'
], function ( $, _, Backbone, THREE, appData, Boid, boids, buildings, specials ) {
    'use strict';

    return {

        // Universal helpers
        getRandom: function ( min, max ) {
            return Math.random() * ( max - min ) + min;
        },

        // Scene helpers
        getDefaultCamera: function ( scene ) {
            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 1000;

            return camera;
        },

        getDefaultControls: function ( camera ) {
            var controls =  new THREE.TrackballControls( camera );
          

            return controls;

        },

        getDefaultScene: function () {
            var scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2( 0xe5eef7, 0.0000000000000000000001 );

            return scene;
        },

        setLights: function ( scene ) {
            var light = new THREE.DirectionalLight( 0xffffff, 2 );
            light.position.set( 1, 1, 1 ).normalize();
            scene.add( light );

            var light = new THREE.DirectionalLight( 0xffffff );
            light.position.set( -1, -1, -1 ).normalize();
            scene.add( light );
        },

        // Boids helpers
        calculateRandomPosition: function() {
            return Math.floor( ( Math.random() * window.innerWidth/2 - window.innerWidth/3 ) / 10 ) * 10 + 5;
        },

        getBoid: function(i, geometry) {
            var self = this,
                boid, 
                boidColor = Math.random() * 0xffffff;

            if ( appData.isLeader ) {
                if ( i === 1 ) {
                    boidColor = 0xff8c00;
                }
                else {
                    boidColor = 0xffffff;
                }
            }

            boid  = new Boid( i, new THREE.Vector3( self.getRandom( 0,200 ), self.getRandom( 0,100 ), self.getRandom( -21,21 ) ) );
            boid.element =  new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: boidColor } ) );
            boid.element.position = self.getRandomPosition();

            return boid;
        },

        getRandomPosition: function () {
            var self = this,
                position = new THREE.Vector3( 0, 0, 0 );

            position.x = self.calculateRandomPosition();
            position.z = Math.floor( ( Math.random() * 200 - 100 ) / 10 ) * 10 + 5;
            position.y = self.calculateRandomPosition();

            return position;
        },

        drawDefaultGroup: function ( geometry, scene ) {
            var self = this;

            for ( var i = 1; i < appData.groupQty; i ++ ) {
                var boid = self.getBoid( i, geometry );
                
                boids.push( boid );
                if ( appData.isLeader && i === 1 ) {
                    specials.leader = boid;
                }
                scene.add( boid.element );
            }
        },

        drawBuilding: function ( geometry, position, scene ) {
            var self = this,
                building = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
            
            building.position = position;
            buildings.push( building );
            scene.add( building );
        }
    }
});