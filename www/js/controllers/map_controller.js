starter.controller('MapCtrl', function(apiUrl, $window, $stateParams, $scope, $ionicLoading, $compile, $http) {
   angular.element(document).ready(function () {
    $scope.init();
   });

   $scope.makeItTrack = function () {
     console.log('asdasdasd')
   }

   $scope.init = function () {

      var course_id = $stateParams.showId

    $http.get(apiUrl+"/courses/"+course_id)
      .success(function (response) {
      $scope.course =response;
    });

    
       var course_id = $window.localStorage.course_id
       $http.get(apiUrl+"/courses/"+course_id+"/courses_points")
       .success(function (locations) {  
    var center = Math.round(locations.length/2);
    var myLatlng = new google.maps.LatLng(locations[center].latitude,locations[center].longitude);
    
    var mapOptions = {
      // center: myLatlng,
      // zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var bounds = new google.maps.LatLngBounds();

    var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
      var coords = [];
      for(index in locations){
        bounds.extend(new google.maps.LatLng(locations[index].latitude, locations[index].longitude));
        coords.push(new google.maps.LatLng(locations[index].latitude, locations[index].longitude));
      };
      map.fitBounds(bounds);
    var flightPlanCoordinates = coords;
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
  
    $scope.map = map;
    })

  }
  
});