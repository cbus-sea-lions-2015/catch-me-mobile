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
       $location.url("/app/show/"+$window.localStorage.course_id);

       var course = {
         city: "Bogota",
         country: "Colombia",
         duration: "1:30:24",
         distance: "35",
         name: "Up the hill",
         average_speed: "20"
       }

      $http.put("http://catch-me-api.herokuapp.com/courses/"+$window.localStorage.course_id, {id: 1,course: course})
      .success(function (response) {
          console.log('success!!!!!')
      $scope.courses =response;
       });
   
   };

     $scope.showPosition = function(position) {
        console.log($window.localStorage.course_id);
          var course_position = {latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                altitude: position.coords.altitude} 
        console.log(course_position)                   
        $http.post('http://catch-me-api.herokuapp.com/courses_points', { course_point: course_position, course_id: $window.localStorage.course_id })
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


