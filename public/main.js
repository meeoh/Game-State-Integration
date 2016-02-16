var app = angular.module('myapp', ['btford.socket-io'])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    })
    .factory('socket', function(socketFactory) {
        return socketFactory();
    });

app.controller('mainController', function($scope, $http, socket) {

    socket.on('data', function(data) {
        $scope.roundPercentage = data.roundPercentage;
        console.log(data);
    });
    
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
