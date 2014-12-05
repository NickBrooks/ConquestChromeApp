app.controller('requestController', function ($scope, $http) {
    $scope.requests = [];
    $scope.searched = [];

    $scope.fetchRequests = function (lastName) {
        fetchRequestsUrl = apiUrl + 'requests/' + lastName + apiSubscription;
        $scope.lastName = lastName;

        $http.get(fetchRequestsUrl).success(function (requests) {
            $scope.requests = requests;            
        }).error(function () {
            $scope.requests = [];
            $scope.searched = 1;
        });
    };

    $scope.searchRequests = function () {
        var lastName = document.getElementById("searchBox").value;
        $scope.fetchRequests(lastName);
    };
    
});