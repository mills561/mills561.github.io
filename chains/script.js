var app = angular.module("chain", []);

app.controller("myCtrl", ['$scope', '$interval', function ($scope, $interval) {
    $scope.teamOneScore = 0;
    $scope.teamTwoScore = 0;
    $scope.score = 0;

    $scope.total = 0;
    $scope.timerStarted = false;
    $scope.time = 60;

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
        $scope.currentWord = Math.floor(Math.random() * $scope.fastMoneyWords.length);
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
        if (correct && $scope.total < 7) {
            $scope.total++;
            $scope.fastMoneyWords.splice($scope.fastMoneyWords.indexOf($scope.fastMoneyWords[$scope.currentWord]), 1);
        }
        $scope.currentWord = Math.floor(Math.random() * $scope.fastMoneyWords.length);
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

    $scope.addWord = function(key) {
        if (key == 13) {
            if ($scope.wordToAdd.length > 0) {
                $scope.fastMoneyWords.push($scope.wordToAdd);
                $scope.wordToAdd = "";
                if ($scope.fastMoneyWords.length == 7) {
                    $scope.enterWords = false;
                    $scope.startTimer();
                } else {
                    document.getElementById("addWords").focus();
                }
            }
        }
    }
}]);