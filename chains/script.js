var app = angular.module("chain", []);

app.controller("myCtrl", ['$scope', '$interval', function ($scope, $interval) {
    $scope.teamOneScore = 0;
    $scope.teamTwoScore = 0;
    $scope.score = 0;

    $scope.total = 0;
    $scope.timerStarted = false;
    $scope.time = 10;

    $scope.fastMoneyWords = [];
    $scope.endingWords = [];
    $scope.correctWords = [];
    $scope.currentWord = 0;

    $scope.finished = false;

    $scope.addTeamOneScore = function() {
        $scope.teamOneScore += $scope.score;
    }

    $scope.addTeamTwoScore = function() {
        $scope.teamTwoScore += $scope.score;
    }

    var stop;
    $scope.startTimer = function() {
        $scope.finished = false;
        $scope.endingWords = $scope.fastMoneyWords.slice();
        $scope.total = 0;
        $scope.currentWord = 0;
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
            $scope.correctWords.push($scope.fastMoneyWords[$scope.currentWord]);
            $scope.fastMoneyWords.splice($scope.fastMoneyWords.indexOf($scope.fastMoneyWords[$scope.currentWord]), 1);
            if ($scope.currentWord >= $scope.fastMoneyWords.length) $scope.currentWord = 0;
        } else {
            if ($scope.currentWord >= $scope.fastMoneyWords.length - 1) $scope.currentWord = 0;
            else $scope.currentWord++;
        }
    }

    $scope.enterNewWords = function() {
        $scope.correctWords = [];
        $scope.endingWords = [];
        if (!$scope.enterWords) $scope.fastMoneyWords = [];
        $scope.enterWords = true; 
        $scope.finished = false;
    }

    $scope.stopTimer = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
            $scope.timerStarted = false;
            $scope.time = 0;
            $scope.currentWord = 0;
            $scope.finished = true;
        }
    }

    $scope.resetWords = function() {
        $scope.word0 = "";
        $scope.word1 = "";
        $scope.word2 = "";
        $scope.word3 = "";
        $scope.word4 = "";
        $scope.word5 = "";
        $scope.word6 = "";
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