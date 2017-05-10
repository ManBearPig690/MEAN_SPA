angular.module('LoginCtrl', []).controller('LoginController', function($scope){
    //$scope.tagline = "DEAR CUCK";
    $scope.username;
    $scope.password;

    $scope.Submit = function(){
        console.log($scope.username);
        console.log($scope.password);
    };
});