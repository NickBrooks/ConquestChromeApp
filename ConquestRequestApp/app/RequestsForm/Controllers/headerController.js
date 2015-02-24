app.controller('headerController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        snackAlert('Logged out.', 'smile-o');
        $location.path('/login');
    };

}]);