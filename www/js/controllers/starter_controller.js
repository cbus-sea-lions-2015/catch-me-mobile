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
   
   $scope.courses = [
  {"id":1,
  "user_id":1,
  "average_speed":null,
  "duration":null,
  "distance":null,
  "country":"Brasil",
  "city":"Manaus",
  "name":"pain road",
  "created_at":"2015-04-19T20:45:01.364Z",
  "updated_at":"2015-04-19T20:45:01.364Z"},
  {"id":1,
  "user_id":1,
  "average_speed":null,
  "duration":null,
  "distance":null,
  "country":"Brasil",
  "city":"Manaus",
  "name":"pain road",
  "created_at":"2015-04-19T20:45:01.364Z",
  "updated_at":"2015-04-19T20:45:01.364Z"},
  {"id":1,
  "user_id":1,
  "average_speed":null,
  "duration":null,
  "distance":null,
  "country":"Brasil",
  "city":"Manaus",
  "name":"pain road",
  "created_at":"2015-04-19T20:45:01.364Z",
  "updated_at":"2015-04-19T20:45:01.364Z"}
   ]
  
 });