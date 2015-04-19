    starter.controller('CoursesCtrl', function($scope, $ionicModal, $timeout, $http, $location) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.registerData = {};
    $scope.runner_id = {};

    $ionicModal.fromTemplateUrl('templates/courses/new-run.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.startRun.modal = modal;
    });

    $scope.startRun = function() {
        $scope.startRun.modal.show();
    };

    $scope.closeRun = function() {
        if (confirm("Are you sure??")) {
            $scope.startRun.modal.hide();
        }
    };

    $scope.timerRunning = true;

    $scope.startTimer = function() {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
    };

    $scope.resumeTimer = function() {
        $scope.$broadcast('timer-resume');
        $scope.timerRunning = true;
    };

    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
    };


    $scope.geolocationData = function() {
      
      function showPosition(position) {
      document.getElementById('location').innerHTML = position.coords.latitude ;
      console.log(position);
      }
       
       function getLocationData() {
        navigator.geolocation.getCurrentPosition(showPosition);
       };
       getLocationData()
    }

    $scope.$on('timer-stopped', function(event, data) {
        console.log('Timer Stopped - data = ', data);
    });

});
