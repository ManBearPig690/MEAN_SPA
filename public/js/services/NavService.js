angular.module('NavService', []).factory('Nav',['$http', function($http){
    return{
        get: function(){
            return $http.get('/checkLogin')
            .success(function(data){
                console.log(data);
                return data;
            })
            .error(function(data){
                console.log('error:' +data);
            });
        }
    }
}]);