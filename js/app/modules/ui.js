define([
    'jquery',
    'underscore',
    'three',
    'appData',
    'userData',
    'slider',
    'semantic'
], function ( $, _, THREE, appData, userData ) {
    'use strict';

    var UI = function () {
        var self = this;

        // SETTINGS
        $('.js-sidebar-toggle')
            .on('click.blur', function (e) {
                $(this)
                    .blur()
                ;
            })
        ;
        $('.js-sidebar')
            .sidebar({
                overlay: true
            })
            .sidebar('attach events', '.js-sidebar-toggle')
        ;

        $('.js-avoidmouse')
            .checkbox({
                onEnable: function () {
                    appData.isAvoidMouse = true;
                },
                onDisable: function () {
                    appData.isAvoidMouse = false;
                }
            })
        ;

        $('.js-tendmouse')
            .checkbox({
                onEnable: function () {
                    appData.isTendMouse = true;
                },
                onDisable: function () {
                    appData.isTendMouse = false;
                }
            })
        ;

        $('.js-switchleader')
            .checkbox({
                onEnable: function () {
                    appData.isLeader = true;
                    appData.isLeaderChanged = true;
                },
                onDisable: function () {
                    appData.isLeader = false;
                    appData.isLeaderChanged = true;
                }
            })
        ;

        $('.js-buildings')
            .checkbox({
                onEnable: function () {
                    appData.isBuildings = true;
                    appData.isBuildingsChanged = true;
                },
                onDisable: function () {
                    appData.isBuildings = false;
                    appData.isBuildingsChanged = true;
                }
            })
        ;

        $(".js-qty").noUiSlider({
             range: [1, 500]
            ,start: appData.groupQty
            ,handles: 1
            ,step: 1
            ,serialization: {
                resolution: 1
                ,to: [$('.js-qty-value'), 'html']
            }
            ,slide: function(){
                appData.groupQty = $(".js-qty").val();
                appData.updateQty = true;
            }
        });

        $(".js-vel").noUiSlider({
             range: [0.5, 12]
            ,start: appData.maxVelocity
            ,handles: 1
            ,step: 0.1
            ,serialization: {
                resolution: 0.1
                ,to: [$('.js-vel-value'), 'html']
            }
            ,slide: function(){
                appData.maxVelocity = $(".js-vel").val()
            }
        });

        $(".js-cohesion").noUiSlider({
             range: [0, 5]
            ,start: appData.cohesionFactor
            ,step: 0.1
            ,handles: 1
            ,serialization: {
                resolution: 0.1
                ,to: [$('.js-cohesion-value'), 'html']
            }
            ,slide: function(){
                appData.cohesionFactor = $(".js-cohesion").val();
            }
        });

        $(".js-separation").noUiSlider({
             range: [0.1, 4]
            ,start: appData.separationFactor
            ,step: 0.1
            ,handles: 1
            ,serialization: {
                resolution: 0.1
                ,to: [$('.js-separation-value'), 'html']
            }
            ,slide: function(){
                appData.separationFactor = $(".js-separation").val();
            }
        });

        $(".js-alignment").noUiSlider({
             range: [-2, 2]
            ,start: appData.alignmentFactor
            ,step: 0.1
            ,handles: 1
            ,serialization: {
                resolution: 0.1
                ,to: [$('.js-alignment-value'), 'html']
            }
            ,slide: function(){
                appData.alignmentFactor = $(".js-alignment").val();
            }
        });


        // SCRIPTS
        $('.js-scripts-toggle')
            .on('click.blur', function (e) {
                $(this)
                    .blur()
                ;
            })
        ;
        $('.js-scripts')
            .sidebar({
                overlay: true
            })
            .sidebar('attach events', '.js-scripts-toggle')
        ;

        $('.js-eval-flocking').on('click.flocking', function () {

            var functionBody = $('.js-flocking-script').val(),
                functionUser = '( ' + functionBody + ' )(boid);'
            
            userData.userFlocking = functionUser;
        
        });

        $('.js-eval-user').on('click.flocking', function () {

            var functionBody = $('.js-user-script').val(),
                functionUser = '( ' + functionBody + ' )(boid);'
            
            userData.userFunction = functionUser;
        
        });


        // THREE.js Controls fix
        $('textarea').on('click', function (e) {
            $(this).focus();
        });
    }

    return UI;
});