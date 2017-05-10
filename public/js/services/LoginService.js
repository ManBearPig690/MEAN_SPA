angular.module('LoginService', []).factory('User', ['$http', function($http){
    return {
        
        // cal lto POST and create new nerd
        login : function(user){
            console.log(user);
            return; //$http.post('/api/login', nerdData);
        }
    };
}]);