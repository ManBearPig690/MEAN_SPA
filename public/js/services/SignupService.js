angular.module('SignupService', []).factory('Signup', ['$http', function($http){
    return {
        
        // cal lto POST and create new nerd
        Signup : function(user){
            console.log(user);
            return $http.post('/api/login', nerdData);
        }
    };
}]);