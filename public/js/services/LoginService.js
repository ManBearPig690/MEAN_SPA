angular.module('LoginService', []).factory('User', ['$http', function($http){
    return {
        
        // cal lto POST and create new nerd
        login : function(nerdData){
            return $http.post('/api/nerds', nerdData);
        }
    };
}]);