angular.module('NavCtrl', []).controller('NavController', ['$scope', '$http', '$rootScope', 'Nav', function($scope, $http, $rootScope, Nav){
    $scope.isLoggedIn = function(){
        $rootScope.loggedIn = Nav.get();
    }
}]);