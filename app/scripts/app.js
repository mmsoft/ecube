'use strict';

/**
 * @ngdoc overview
 * @name yoAngularApp
 * @description
 * # yoAngularApp
 *
 * Main module of the application.
 */
angular
  .module('yoAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'ui.grid',
    'ui.grid.pinning',
    'angularUUID2',
    'ngDialog',
    'ui.bootstrap',
    'dialogs.main'
  ])
  .config(function ($routeProvider, $translateProvider, RestangularProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $translateProvider.translations('zh-CN',{

      DIALOGS_YES: "好",
      DIALOGS_NO: "不"
    });

    RestangularProvider.setBaseUrl('http://localhost:55170/api');
  });
