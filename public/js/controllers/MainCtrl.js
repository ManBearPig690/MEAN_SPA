angular.module('MainCtrl', []).controller('MainController',  ['$scope', '$rootScope', function($scope, $rootScope){
    
    // Checks if the user has logged
    // $scope.isLoggedIn = function(){
    //     $rootScope.loggedIn = Nav.get();
    //     console.log("isLoggedIn called!!");
    // };

    $scope.tagline = 'To the moon and back!';
}]);