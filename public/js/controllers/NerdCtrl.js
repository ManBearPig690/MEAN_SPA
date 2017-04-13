angular.module('NerdCtrl', []).controller('NerdController', ['$scope', 'Nerd', function($scope, Nerd){
    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.Nerds = Nerd.get();
}]);