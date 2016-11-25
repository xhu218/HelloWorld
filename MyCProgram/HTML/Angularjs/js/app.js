var app = angular.module('myApp', []);
app.controller("MyController", function($scope) {
    $scope.name = "111";

    $scope.sayhello = function() {
        console.log($scope.name);
        $scope.name = "this is wfg";

    };


    $scope.clock = {
        now: new Date()
    };

    var updateClock = function() {
        $scope.clock.now = new Date();
        //$scope.name = new Date();
    };

    setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);

    //updateClock();



});
