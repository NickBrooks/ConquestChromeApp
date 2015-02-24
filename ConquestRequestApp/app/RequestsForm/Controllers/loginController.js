app.controller('loginController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
            snackAlert('Welcome, ' + $scope.loginData.userName + '!', 'smile-o');
            $location.path('/home');
        },
         function (err) {
             $scope.message = "Invalid login credentials.";
         });
    };

}]);