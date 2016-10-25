var app = angular.module("chain", []);

app.controller("myCtrl", ['$scope', function ($scope) {
    $scope.teamOneScore = 0;
    $scope.teamTwoScore = 0;
    $scope.score = 0;

    $scope.addTeamOneScore = function() {
        $scope.teamOneScore += $scope.score;
    }

    $scope.addTeamTwoScore = function() {
        $scope.teamTwoScore += $scope.score;
    }
}]);