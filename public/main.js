var app = angular.module('myapp', [])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });;

app.controller('mainController', function($scope, $http) {

    console.log('test');
    $scope.test = "test";
    $scope.buttonText = "Request";
    $scope.shameelRequest = true;    

    $scope.request = function(name) {
        $scope.buttonText = "Requested";
        $scope.shameelRequest = false;
        
        if (name == 'shameel') {
            $http.post('/request/shameel').then(function(res) {});
        } else if (name == 'nomar') {
            $http.post('/request/nomar').then(function(res) {});
        } else {
            $http.post('/request/omas').then(function(res) {});
        }
    }

});
