starter.controller('StarterCtrl', function($scope, $http, $location, $window) {
   
   $scope.startRun = function() {
        var user_id = $window.localStorage.userId
       $http.post('http://catch-me-api.herokuapp.com/courses', {user_id: user_id})
       .success(function (response) {
        console.log(response);
         if (response != false) {
            $window.localStorage.course_id = response;

         }
       });
    $location.url("/app/runs");
   };
   
    var user_id = $window.localStorage.userId

    $http.get("http://catch-me-api.herokuapp.com/users/"+user_id+"/courses")
      .success(function (response) {
      $scope.courses =response;
    });
 

  
 });