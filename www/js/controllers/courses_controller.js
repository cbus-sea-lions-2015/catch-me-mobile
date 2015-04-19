starter.controller('CoursesCtrl', function($scope, $ionicModal, $timeout, $http, $location, $interval, $window) {
   // Form data for the login modal
   $scope.loginData = {};
   $scope.registerData = {};
   $scope.runner_id = {};
   $scope.course_id = "";

   $ionicModal.fromTemplateUrl('templates/courses/new-run.html', {
       scope: $scope
   }).then(function(modal) {
       $scope.startRun.modal = modal;
   });

   $scope.startRun = function() {
       $scope.startRun.modal.show();
       $http.post('http://catch-me-api.herokuapp.com/courses', {user_id: 4})
       .success(function (response) {
         if (response != false) {
            $scope.course_id = response;
         }
       });
   };

   $scope.closeRun = function() {
       if (confirm("Are you sure??")) {
           $scope.startRun.modal.hide();
           $interval.cancel($scope.geoLocationData);
           $window.clearInterval($scope.geoLocationData); 
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
       geoLocationData();
   };

   $scope.stopTimer = function() {
       $scope.$broadcast('timer-stop');
       $scope.timerRunning = false;
       $window.clearInterval($scope.geoLocationData); 
       $scope.startRun.modal.hide();
   };



   $scope.geoLocationData = $window.setInterval(  
        $scope.getLocationData
        ,3000 );


     $scope.showPosition = function(position) {

     // console.log(position);
     document.getElementById('location').innerHTML = position.coords.latitude ;

      var course_position = {latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            altitude: position.coords.altitude}
                             
     return $http.post('http://catch-me-api.herokuapp.com/courses_points', {course_point: course_position, course_id: $scope.course_id})
    
     }
      
      $scope.getLocationData = function() {
       return navigator.geolocation.getCurrentPosition($scope.showPosition);
      };
      // getLocationData();


   $scope.$on('timer-stopped', function(event, data) {
       console.log('Timer Stopped - data = ', data);
   });
});