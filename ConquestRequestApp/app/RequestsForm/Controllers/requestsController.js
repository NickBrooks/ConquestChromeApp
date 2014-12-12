//***************************************
//
//requestList Controller
//
//***************************************
appControllers.controller('requestListController', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
        $scope.lastName = 'Brooks';
        $scope.requests = [];
        Url = apiUrl + 'requests/' + $scope.lastName + apiSubscription;

        //fetch requests
        $scope.fetchRequests = function (lastName) {
            $rootScope.reqStatus = 'loading';

            $http.get(Url).success(function (requests) {
                $rootScope.reqStatus = '';
                $scope.requests = requests;
            }).error(function (data, status, headers, config) {
                $rootScope.reqStatus = 'error';
                $rootScope.reqError = {
                    Headers: headers,
                    Msg: data,
                    Status: status,
                    Config: config
                };
            });
        };

        //run fetch on page load
        $scope.fetchRequests();
    }]);


//***************************************
//
//request Controller
//
//***************************************
appControllers.controller('requestController', ['$scope', '$routeParams', '$http', '$window', '$rootScope',
    function ($scope, $routeParams, $http, $window, $rootScope) {
        $scope.Url = apiUrl + 'request/' + $routeParams.requestID + apiSubscription;
        $scope.editableRequest = [];
        $scope.request = [];

        //get request
        $scope.getRequest = function () {
            $rootScope.reqStatus = 'loading';
            $http.get($scope.Url).success(function (request) {
                $rootScope.reqStatus = '';
                $scope.request = request;

                //copy request scope to revert reset request form
                $scope.editableRequest = angular.copy($scope.request);
            }).error(function (data, status, headers, config) {
                $rootScope.reqStatus = 'error';
                $rootScope.reqError = {
                    Headers: headers,
                    Msg: data,
                    Status: status,
                    Config: config
                };
            });
        };

        //reset request form
        $scope.resetRequestForm = function () {
            $scope.editableRequest = angular.copy($scope.request);
        };

        //submit request form
        $scope.submitRequestForm = function () {
            $rootScope.reqStatus = 'loading';

            $http.post(apiUrl + 'request/' + apiSubscription, $scope.editableRequest).
              success(function (data) {
                  $rootScope.reqStatus = '';
                  $scope.request = angular.copy($scope.editableRequest);
              }).
              error(function (data, status, headers, config) {
                  $rootScope.reqStatus = 'error';
                  $rootScope.reqError = {
                      Headers: headers,
                      Msg: data,
                      Status: status,
                      Config: config
                  };
              });
        };

        //run getRequest on page load
        $scope.getRequest();
    }]);