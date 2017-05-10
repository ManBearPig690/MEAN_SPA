angular.module('SignupCtrl', []).controller('SignupController', function($scope){
    $scope.user = {
        local:{
            username: "",
            password: ""
        },
        profile:{
            firstname: "",
            lastname: "",
            email:""
        }
    };
    $scope.tagline = "Signup for an account";
});