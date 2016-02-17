var app = angular.module('myapp', ['btford.socket-io'])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    })
    .factory('socket', function(socketFactory) {
        return socketFactory();
    });

app.controller('mainController', function($scope, $http, socket) {

    socket.on('data:shameel', function(data) {        
        $scope.shameelPercentage = data.percentage;        
    });

    socket.on('data:nomar', function(data){
        $scope.nomarPercentage = data.percentage;
    });

    socket.on('data:omas', function(data){
        $scope.omasPercentage = data.percentage;
    });
    
    $scope.test = "test";
    $scope.shameelButtonText = "Request";
    $scope.shameelRequest = true;
    $scope.nomarButtonText = "Request";
    $scope.nomarRequest = true;
    $scope.omasButtonText = "Request";
    $scope.omasRequest = true;

    var enableButton = function(name){
        $scope.shameelButtonText = "Request";
        $scope.shameelRequest = true;
    }

    $scope.request = function(name) {        

        if (name == 'shameel') {
            $scope.shameelButtonText = "Requested";
            $scope.shameelRequest = false;
            console.log($scope.shameelRequest);
            $http.post('/request/shameel').then(function(res) {});            
        } else if (name == 'nomar') {
            $scope.nomarButtonText = "Requested";
            $scope.nomarRequest = false;
            $http.post('/request/nomar').then(function(res) {});
        } else {
            $scope.omasButtonText = "Requested";
            $scope.omasRequest = false;
            $http.post('/request/omas').then(function(res) {});
        }
    }

});
