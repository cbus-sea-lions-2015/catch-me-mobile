starter.controller('CoursesCtrl', function( $scope, $ionicModal, $timeout, $http, $location, $interval, $window, auth) {
   // Form data for the login modal
   $scope.loginData = {};
   $scope.registerData = {};
   $scope.runner_id = {};
   $scope.timerRunning = true;



   $scope.startTimer = function() {

       $scope.$broadcast('timer-start');
       $scope.timerRunning = true;
   };

   $scope.resumeTimer = function() {
       $scope.$broadcast('timer-resume');
       $scope.timerRunning = true;
       $scope.geoLocationData();
   };

   $scope.stopTimer = function() {
       $scope.$broadcast('timer-stop');
       $scope.timerRunning = false;
       $interval.cancel($scope.geoLocationData); 
   };

     $scope.showPosition = function(position) {
        console.log($window.localStorage.course_id);
          var course_position = {latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                altitude: position.coords.altitude}                    
        $http.post('http://localhost:3000/courses_points', { course_point: course_position, course_id: $window.localStorage.course_id })
    }
      
      $scope.getLocationData = function() {
        navigator.geolocation.getCurrentPosition($scope.showPosition);

      };

     $scope.geoLocationData = $interval(  
      $scope.getLocationData
      ,3000 );


   $scope.$on('timer-stopped', function(event, data) {
       console.log('Timer Stopped - data = ', data);
   });
});


