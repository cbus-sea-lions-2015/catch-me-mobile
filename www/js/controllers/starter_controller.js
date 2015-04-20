starter.controller('StarterCtrl', function($scope, $http, $window) {
   
   $scope.startRun = function() {

    var user_id = $window.localStorage.userId
        console.log(user_id);
       $http.post('http://catch-me-api.herokuapp.com/courses', {user_id: user_id})
       .success(function (response) {
        console.log(response);
         if (response != false) {
            $window.localStorage.course_id = response;

         }
       });
   };
   
    var user_id = $window.localStorage.userId

    $http.get("http://catch-me-api.herokuapp.com/users/"+13+"/courses")
      .success(function (response) {
          console.log(response)
      $scope.courses =response;
    });
 

  
 });