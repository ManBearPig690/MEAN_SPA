// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/signup',{
        templateUrl: 'views/signup.html',
        controller: 'SignupController'
    })
    .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
    })
    .when('/nerds',{
        templateUrl: 'views/nerd.html',
        controller: 'NerdController'
    })
    .when('/map',{
        templateUrl: 'views/mapper.html',
        controller: 'MapperController'
    });
    $locationProvider.html5Mode(true);
}]);

