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
        $scope.Url = apiUrl + 'request/' + $routeParams.requestID + apiSubscription;

        $scope.getRequest = function () {
            reqActive(true);
            $http.get($scope.Url).success(function (request) {
                reqActive(false);
                $scope.request = request;

                //copy request scope to revert reset request form
                $scope.editableRequest = angular.copy($scope.request);
            }).error(function (error) {
                reqError(true);
                console.log(error);
            });
        };

        //reset request form
        $scope.resetRequestForm = function () {
            $scope.editableRequest = angular.copy($scope.request);
        };

        //submit request form
        $scope.submitRequestForm = function () {
            reqActive(true);

            $http.post(apiUrl + 'request/' + apiSubscription, $scope.editableRequest).
              success(function (data) {
                  reqActive(false);
                  console.log('Success: ' + data);
                  $scope.request = angular.copy($scope.editableRequest);
              }).
              error(function (error) {
                  reqError(true);
                  console.log('Error: ' + error);
              });
        };

        //run getRequest on page load
        $scope.getRequest();
    }]);