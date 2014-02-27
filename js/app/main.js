/* global require */
'use strict';

// require config
requirejs.config({
    baseUrl: 'js',
    urlArgs: new Date().getTime(),
    paths: {
        app         : 'app',
        jquery      : 'lib/jquery-1.9.1.min',
        backbone    : 'lib/backbone-min',
        semantic    : 'lib/semantic.min',
        underscore  : 'lib/underscore',
        three       : 'lib/three.min',
        slider      : 'lib/jquery.nouislider.min',
        modules     : 'app/modules',
        views       : 'app/views',
        flocking    : 'app/flocking',
        flock       : 'app/flock',
        collections : 'app/collections',
        appData     : 'app/appData',
        appHelpers  : 'app/appHelpers',
        userData    : 'app/userData'
    },
    shim: {
        three: {
            exports: 'THREE'
        },
        underscore: {
            exports: '_'
        }, 
        deep: {
            deps: ['underscore'],
            exports: '_deep'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require([
    'jquery',
    'backbone',
    'app/routers/router',
    'app/views/app'
], function ( $, Backbone, Workspace, AppView ) {

    new Workspace();

    Backbone.history.start({ pushState: 'pushState' in window.history, root: '/', hashChange: false });
    
    // Only need this for pushState enabled browsers
    if ( Backbone.history && Backbone.history._hasPushState ) {

        // Use delegation to avoid initial DOM selection and allow all matching elements to bubble
        $( document ).delegate( 'a:not([data-bypass])', 'click', function ( evt ) {
            // Get the anchor href and protcol
            var $link = $(this),
                href = $link.attr( 'href'),
                protocol = this.protocol + "//";

            $link.blur();

            // Ensure the protocol is not part of URL, meaning its relative.
            // Stop the event bubbling to ensure the link will not cause a page refresh.
            if ( href.slice( protocol.length ) !== protocol ) {
                evt.preventDefault();

                // Note by using Backbone.history.navigate, router events will not be
                // triggered. If this is a problem, change this to navigate on your
                // router.
                Backbone.history.navigate( href, true );
            }
        });

        $( document ).delegate( 'a[data-bypass]', 'click', function ( evt ) {
            evt.preventDefault();

            if ( $( this ).is( 'a[data-refresh]' ) ) {
                window.location.href = $( this ).attr( 'href' );
            }else {
                window.open( $( this ).attr( 'href' ) );
            }
        }); 
    }
    new AppView();
});