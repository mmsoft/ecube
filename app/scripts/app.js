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
    'ui.grid.resizeColumns',
    'angularUUID2',
    'ui.bootstrap',
    'dialogs.main',
    'pascalprecht.translate',
    'validation', 'validation.rule'
  ])
  .config(function ($routeProvider, $translateProvider, RestangularProvider, $validationProvider) {

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

    $translateProvider.translations('zh-CN', {

      DIALOGS_YES: "好",
      DIALOGS_NO: "不"
    }).preferredLanguage('zh-CN');

    $validationProvider.setErrorHTML(function (msg) {
      return "<label class=\"control-label has-error\">" + msg + "</label>";
    });

    angular.extend($validationProvider, {
      validCallback: function (element) {
        $(element).parents('.form-group:first').removeClass('has-error');
      },
      invalidCallback: function (element) {
        $(element).parents('.form-group:first').addClass('has-error');
      }
    });

    $validationProvider.setDefaultMsg({
      required: {
        error: "* 必填", success: ""
      }
    });

    RestangularProvider.setBaseUrl('http://localhost:55170/api');
  });
