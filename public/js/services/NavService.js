angular.module('NavService', []).factory('Nav', ['$http', function($http){
    return {
        // call to get all nerds
        get : function(){
            return $http.get('/api/checkLogin');
        }
    };
}]);