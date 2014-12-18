//***************************************
//
//requestList Controller
//
//***************************************
appControllers.controller('requestListController', ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
        $scope.lastName = 'Brooks';
        $scope.requests = [];

        //fetch requests
        $scope.fetchRequests = function (lastName) {
            $rootScope.reqStatus = 'loading';

            $http.get(apiURL('byLastName/' + $scope.lastName)).success(function (requests) {
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

        //complete request
        $scope.completeRequest = function (ID) {
            console.log('Here ID: ' + ID);
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
        $scope.editableRequest = [];
        $scope.request = [];

        //get request
        $scope.getRequest = function () {
            $rootScope.reqStatus = 'loading';
            $http.get(apiURL('ID/' + $routeParams.requestID)).success(function (request) {
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
            snackAlert('Form reset', 'undo');
        };

        //submit request form
        $scope.submitRequestForm = function () {
            $rootScope.reqStatus = 'loading';

            $http.post(apiURL('send/'), $scope.editableRequest).
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

        //change the request completion
        $scope.updateCompletion = function () {
            if ($scope.editableRequest.Complete) {
                $http.post(apiURL('complete/' + $scope.request.ID)).
                    success(function (data) {
                        snackAlert($scope.request.ReferenceID + ' completed.', 'check');
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

            } else {
                $http.post(apiURL('reverseComplete/' + $scope.request.ID)).
                    success(function (data) {
                        snackAlert($scope.request.ReferenceID + ' reverse completed.', 'undo');
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
        };

        //run getRequest on page load
        $scope.getRequest();
    }]);