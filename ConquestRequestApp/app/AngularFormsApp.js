var app = angular.module('requestApp', [
    'ngRoute',
    'appControllers',
    'ngStorage'
]);

var appControllers = angular.module('appControllers', []);

//
//Declare Global Variables
//
//URL Set up
var apiBaseUrl = 'https://conquestapi.azure-api.net/test/';
var apiConnection = 'faulkner%20CityOfDarwin/';
var apiUrl = apiBaseUrl + apiConnection;
var apiSubscription = '?subscription-key=3f2fe91ca4534c8f88345e98e4e9552b';

//
//Routing
//
app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: '/app/RequestsForm/Templates/requestsList.html',
            controller: 'requestListController'
        }).
        when('/request/:requestID', {
            templateUrl: '/app/RequestsForm/Templates/requestSingle.html',
            controller: 'requestController'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);