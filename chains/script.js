var app = angular.module("chain", []);

app.controller("myCtrl", ['$scope', '$interval', function ($scope, $interval) {
    $scope.teamOneScore = 0;
    $scope.teamTwoScore = 0;
    $scope.score = 0;

    $scope.total = 0;
    $scope.timerStarted = false;
    $scope.time = 10;

    $scope.fastMoneyWords = [];
    $scope.currentWord = 0;

    $scope.addTeamOneScore = function() {
        $scope.teamOneScore += $scope.score;
    }

    $scope.addTeamTwoScore = function() {
        $scope.teamTwoScore += $scope.score;
    }

    var stop;
    $scope.startTimer = function() {
        $scope.total = 0;
        if ($scope.time == 0) $scope.time = 60;
        $scope.timerStarted = true;

        stop = $interval(function() {
            if ($scope.time > 0 && $scope.total < 7) {
                $scope.time--;
            } else {
                $scope.stopTimer();
            }
        }, 1000);
    }

    $scope.newWord = function(correct) {
        $scope.currentWord++;
        if (correct && $scope.total < 7) {
            $scope.total++;
        }
    }

    $scope.stopTimer = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
            $scope.timerStarted = false;
            $scope.time = 0;
            $scope.fastMoneyWords = [];
            $scope.currentWord = 0;
        }
    }

    $scope.addWord = function() {
        $scope.fastMoneyWords.push($scope.wordToAdd);
        $scope.wordToAdd = "";
        if ($scope.fastMoneyWords.length == 7) {
            $scope.enterWords = false;
            $scope.startTimer();
        } else {
            document.getElementById("addWords").focus();
        }
    }
}]);