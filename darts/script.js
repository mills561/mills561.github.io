var app = angular.module("darts", []);

app.controller("myCtrl", ['$scope', function ($scope) {
    $scope.showFirstName = true;
    $scope.showSecondName = true;
    $scope.firstName = "Name 1";
    $scope.secondName = "Name 2";
    $scope.value = ['20', '19', '18', '17', '16', '15', 'Bull'];

    $scope.showHideFirstName = function() {
        $scope.showFirstName = !$scope.showFirstName;
    }

    $scope.showHideSecondName = function() {
        $scope.showSecondName = !$scope.showSecondName;
    }

    $scope.addCheck = function(event) {
        console.log(event);
        var current = event.currentTarget.innerHTML;
        if (current == "click") {
            event.currentTarget.innerHTML = "";
        }
        event.currentTarget.innerHTML += "<span class='glyphicon glyphicon-ok'></span>";
    }

    $scope.reset = function() {
        location.reload();
    }

    $scope.getNumber = function(num) {
        return new Array(num);   
    }
}]);