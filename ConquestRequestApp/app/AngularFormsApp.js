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
var apiBaseUrl = 'https://conquestapi.azure-api.net/dev/api/';
var apiDataSource = 'faulkner%20CityOfDarwin';
var apiSubscriptionKey = '3f2fe91ca4534c8f88345e98e4e9552b';

//build URL
function apiURL(apiCtrl) {
    apiURLReturn = apiBaseUrl + apiCtrl + '?dataSource=' + apiDataSource + '&subscription-key=' + apiSubscriptionKey;
    return apiURLReturn;
}

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