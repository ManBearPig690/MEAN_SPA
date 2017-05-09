angular.module('MainCtrl', []).controller('MainController',  ['$scope', '$rootScope', 'Nav', function($scope, $rootScope, Nav){
    
    // Checks if the user has logged
    $scope.isLoggedIn = function(){
        $rootScope.loggedIn = Nav.get();
        console.log("isLoggedIn called!!");
    };

    $scope.tagline = 'To the moon and back!';
}]);