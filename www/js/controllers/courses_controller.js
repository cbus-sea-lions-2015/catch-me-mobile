starter.controller('CoursesCtrl', function(apiUrl, $scope, $ionicModal, $timeout, $http, $location, $interval, $window, auth) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};
  $scope.runner_id = {};
  $scope.timerRunning = true;

  $scope.getLocationData = function() {
    navigator.geolocation.getCurrentPosition($scope.showPosition);
  }

  $scope.geoLocationData = $interval(
    $scope.getLocationData, 3000
  );

  $scope.startTimer = function() {
    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
    $scope.geoLocationData();
  }

  $scope.resumeTimer = function() {
    $scope.$broadcast('timer-resume');
    $scope.timerRunning = true;
    $scope.geoLocationData();
  }

  $scope.stopTimer = function() {
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
    $interval.cancel($scope.geoLocationData);
    $location.url("/app/show/" + $window.localStorage.course_id);

  }

  $scope.showPosition = function(position) {
    // console.log($window.localStorage.course_id);
    var course_position = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    console.log("latitude: ", position.coords.latitude);
    console.log("longitude: ", position.coords.longitude);
    $http.post(apiUrl + '/courses_points', {
      course_point: course_position,
      course_id: $window.localStorage.course_id
    })
  }

  // $scope.$on('timer-stopped', function(event, data) {
  //   console.log('Timer Stopped - data = ', data);
  // });
});
