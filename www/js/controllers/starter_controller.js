starter.controller('StarterCtrl', function(auth, $scope, $http, $location, $window, apiUrl) {
   
   $scope.startRun = function() {
       var auth_id = auth.profile.identities[0].user_id;
       
       $http.post(apiUrl+"/courses", {auth_id: auth_id})
       .success(function (response) {
        console.log(response);
         if (response != false) {
            $window.localStorage.course_id = response;

         }
       });
    $location.url("/app/runs");
   };
   
    var auth_id = auth.profile.identities[0].user_id;

    $http.get(apiUrl+"/users/"+auth_id+"/courses")
      .success(function (response) {
      $scope.courses =response;
    });
 

  
 });