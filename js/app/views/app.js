define([
    'jquery',
    'underscore',
    'backbone',
    'three',
    'views/default',
    'modules/ui'
], function ($, _, Backbone, THREE, DefaultView, UI) {
    'use strict';

    var AppView = Backbone.View.extend({

        // canvas element
        el                  : '#app',
        canvas              : '#webgl',

        clock               : new THREE.Clock(),

        currentView         : null,

        // view objects
        scene               : null,
        camera              : null,
        controls            : null,

        // main objects
        projector           : new THREE.Projector(),
        renderer            : new THREE.WebGLRenderer( { antialias: true, alpha: false } ),

        // mouse
        mouse               : new THREE.Vector2(),
        mouseDown           : false,

        scrollTimer         : 0,

        events              : {
            'mousemove  #webgl'     : 'onMouseMove'
        },


        /**
         * Initialize
         */
        initialize: function () {
            new UI();

            _.bindAll( this );

            this._setView()
                ._init( this )
                ._animate();
        },

        /**
         * Init App View
         */
        _init: function () {
            this.renderer.setClearColor( 0x000000, 0.2 );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.sortObjects       = false;
            this.renderer.shadowMapEnabled  = true;

            if ( _.isFunction( this.currentView.setRenderer ) ) {
                this.rendered = this.currentView.setRenderer( this.renderer );
            }

            $(this.canvas).append( this.renderer.domElement );

            return this;
        },


        /**
         * Set current view (scene, camera & controls)
         */
        _setView: function () {
            var self = this,
                viewID = $("#app").data('view');

            switch(viewID) {
                case 0:
                default:
                    this.currentView = new DefaultView();
                    break;
            }

            this._setViewVars();
        
            return this;
        },

        _setViewVars: function () {
            if ( this.currentView ) {
                this.scene      = this.currentView.scene;
                this.camera     = this.currentView.camera;
                this.controls   = this.currentView.controls;
            }

            return this;
        },


        /**
         * Render event
         */
        _render: function () {
            var self = this;

            if ( self.controls ) {
                self.controls.update( self.clock.getDelta() );
            }

            if ( self.currentView && _.isFunction( self.currentView._render ) ) {
                self.currentView._render( self );
            }

            self.renderer.render( self.scene, self.camera );

            return self;
        },

        /**
         * Animate event
         */
        _animate: function() {
            requestAnimationFrame( this._animate );
            
            this._render();

            return this;
        },

        /**
         * Mouse move bind
         */ 
        onMouseMove: function ( e ) {
            var self = this,
                vector,
                dir,
                distance;

            self.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            self.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

            vector = new THREE.Vector3( self.mouse.x, self.mouse.y, 0.5 );
            self.projector.unprojectVector( vector,  self.camera );
            dir = vector.sub( self.camera.position ).normalize();
            distance = -self.camera.position.z / dir.z;
            appData.mouseVector = self.camera.position.clone().add( dir.multiplyScalar( distance ) );
        }

    });

    return AppView;
});