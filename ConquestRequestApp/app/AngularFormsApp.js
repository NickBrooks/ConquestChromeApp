var app = angular.module('requestApp', [
    'ngRoute',
    'angular-loading-bar',
    'LocalStorageModule'
]);

//
//Declare Global Variables
//
//URL Set up
var apiBaseUrl = 'https://conquestapi.azure-api.net/dev/';
var apiDataSource = 'faulkner%20CityOfDarwin';
var apiSubscriptionKey = '3f2fe91ca4534c8f88345e98e4e9552b';
var connectionName = 'ConquestOfficeNick';

//build URL
function apiURL(apiCtrl) {
    var host = window.localStorage.getItem("apiHostName");
    if (host == "localhost") {
        apiURLReturn = "http://localhost/conquestapi/api/" + apiCtrl;
    }
    else if (host == "paine") {
        apiURLReturn = "http://paine/" + apiCtrl + '?dataSource=' + apiDataSource
    }
    else {
        apiURLReturn = apiBaseUrl + apiCtrl + '?dataSource=' + apiDataSource + '&subscription-key=' + apiSubscriptionKey;
    }
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
        when('/request/new', {
            templateUrl: '/app/RequestsForm/Templates/requestSingle.html',
            controller: 'requestController'
        }).
        when('/login/', {
            templateUrl: '/app/RequestsForm/Templates/login.html',
            controller: 'loginController'
        }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

//populate upon opening page
app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

//
//Snackbar
//
function snackAlert(content, icon) {
    $.snackbar({
        content: '<i class="fa fa-lg fa-' + icon + '"></i> ' + content,
        timeout: 3000
    });
}