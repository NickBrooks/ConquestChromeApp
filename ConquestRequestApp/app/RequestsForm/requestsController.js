appControllers.controller('requestListController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.requests = [];
        $scope.searched = [];

        //fetch requests
        $scope.fetchRequests = function (lastName) {
            Url = apiUrl + 'requests/' + lastName + apiSubscription;
            $scope.lastName = lastName;

            $http.get(Url).success(function (requests) {
                $scope.requests = requests;
            }).error(function () {
                $scope.requests = [];
                $scope.searched = 1;
            });
        };

        //run fetch on page load
        $scope.fetchRequests('Brooks');

    }]);

appControllers.controller('requestController', ['$scope', '$routeParams', '$http', '$window',
    function ($scope, $routeParams, $http, $window) {

        //get request if param Set
        Url = apiUrl + 'request/' + $routeParams.requestID + apiSubscription;
        $http.get(Url).success(function (request) {
            console.log(request);
            $scope.request = request;

            //copy request scope to revert reset request form
            $scope.editableRequest = angular.copy($scope.request);
        }).error(function (error) {
            console.log(error);
        });

        //reset request form
        $scope.resetRequestForm = function () {
            $scope.editableRequest = angular.copy($scope.request);
        };

        //submit request form
        $scope.submitRequestForm = function () {
            $http.post(apiUrl + 'request/' + apiSubscription, JSON.stringify($scope.editableRequest)).
              success(function (data) {
                  console.log('Success: ' + data);
                  $scope.request = angular.copy($scope.editableRequest);
              }).
              error(function (error) {
                  console.log('Error: ' + error);
              });
        };
    }]);