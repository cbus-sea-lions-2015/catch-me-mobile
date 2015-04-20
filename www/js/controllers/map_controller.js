starter.controller('MapCtrl', function($scope, $ionicLoading, $compile, $http) {
   
   $scope.init = function () {
       $http.get("http://catch-me-api.herokuapp.com/courses/"+58+"/courses_points")
       .success(function (locations) {  

    var center = Math.round(locations.length/2);
    var myLatlng = new google.maps.LatLng(locations[center].latitude,locations[center].longitude);
    
    var mapOptions = {
      center: myLatlng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
      var coords = [];
      for(index in locations){
          coords.push(new google.maps.LatLng(locations[index].latitude, locations[index].longitude));
      };
    
    console.log(coords);
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