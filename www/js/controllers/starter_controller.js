starter.controller('StarterCtrl', function($scope, $http, $window) {
   
   $scope.startRun = function() {
       $http.post('http://catch-me-api.herokuapp.com/courses', {user_id: 4})
       .success(function (response) {
        console.log(response);
         if (response != false) {
            $window.localStorage.course_id = response;
            console.log($window.localStorage.course_id)
         }
       });
   };

 });