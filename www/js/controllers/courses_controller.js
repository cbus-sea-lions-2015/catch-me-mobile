starter.controller('CoursesCtrl', function( apiUrl, $scope, $ionicModal, $timeout, $http, $location, $interval, $window, auth) {
   // Form data for the login modal
   $scope.loginData = {};
   $scope.registerData = {};
   $scope.runner_id = {};
   $scope.timerRunning = true;

    $scope.updateCourse = function () {

     var course_id = $window.localStorage.course_id 

    $http.get(apiUrl+"/courses/"+course_id)
      .success(function (response) {
      console.log(response)
      $scope.course =response;
    });
    }

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

   };

     $scope.showPosition = function(position) {
        $scope.updateCourse();
          var course_position = {latitude: position.coords.latitude,
                                longitude: position.coords.longitude} 
      
        console.log(course_position)                   
        $http.post(apiUrl+'/courses_points', { course_point: course_position, course_id: $window.localStorage.course_id })
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


