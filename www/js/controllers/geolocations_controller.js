// starter.controller('GeolocationsCtrl', ['$scope', '$interval', '$timeout', 
//       function($scope, $ionicModal, $timeout, $http, $location) {

//         // $scope.geoLocationData = function() {
         
//          function showPosition(position) {
//          console.log(position);
//          document.getElementById('location').innerHTML = position.coords.latitude ;

//           var course_position = {latitude: position.coords.latitude,
//                                 longitude: position.coords.longitude,
//                                 altitude: position.coords.altitude}
                                 
//          console.log(course_position)
//          $http.post('http://catch-me-api.herokuapp.com/courses_points', {course_point: course_position, course_id: $scope.course_id})
//          }
          
//           function getLocationData() {
//            navigator.geolocation.getCurrentPosition(showPosition);
//           };
//           getLocationData();
//           // setInterval(getLocationData(),500)
//        // }

//       $interval(function(){
//         getLocationData();
//       },500)
//   }]);