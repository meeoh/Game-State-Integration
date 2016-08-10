var app = angular.module('myapp', ['btford.socket-io'])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    })
    .factory('socket', function(socketFactory) {
        return socketFactory();
    });

app.controller('mainController', function($scope, $http, $timeout, socket) {

    socket.on('data:shameel', function(data) {
        if(data.percentage != $scope.shameelPercentage) {
            console.log("CHANGE");
        }        
        $scope.shameelPercentage = data.percentage;
    });

    socket.on('data:nomar', function(data) {
        $scope.nomarPercentage = data.percentage;
    });

    socket.on('data:omas', function(data) {
        $scope.omasPercentage = data.percentage;
    });

    $scope.test = "test";
    $scope.shameelButtonText = "Request";
    $scope.shameelRequest = true;
    $scope.nomarButtonText = "Request";
    $scope.nomarRequest = true;
    $scope.omasButtonText = "Request";
    $scope.omasRequest = true;
    $scope.allButtonText = "REQUEST ALL";
    $scope.allRequest = true;


    $scope.request = function(name) {

        if (name == 'shameel') {
            $scope.shameelButtonText = "Requested";
            $scope.shameelRequest = false;
            $http.post('/request/shameel').then(function(res) {});
            $timeout(function() {
                $scope.shameelButtonText = "Request";
                $scope.shameelRequest = true;
                console.log($scope.shameelRequest);
            }, 60000);
        } else if (name == 'nomar') {
            $scope.nomarButtonText = "Requested";
            $scope.nomarRequest = false;
            $http.post('/request/nomar').then(function(res) {});
            $timeout(function() {
                $scope.nomarButtonText = "Request";
                $scope.nomarRequest = true;
                console.log($scope.omasRequest);
            }, 60000);
        } else if (name == 'omas') {
            $scope.omasButtonText = "Requested";
            $scope.omasRequest = false;
            $http.post('/request/omas').then(function(res) {});
            $timeout(function() {
                $scope.omasButtonText = "Request";
                $scope.omasRequest = true;
                console.log($scope.omasRequest);
            }, 60000);
        } else {
            $scope.allButtonText = "Requested";
            $scope.allRequest = false;
            $http.post('/request/all').then(function(res) {});
            $timeout(function() {
                $scope.allButtonText = "REQUEST ALL";
                $scope.allRequest = true;
                console.log($scope.omasRequest);
            }, 60000);
        }
    }

});
