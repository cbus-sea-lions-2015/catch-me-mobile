starter.controller('UsersCtrl', function($scope, apiUrl, auth, $http) {

$scope.getChartData = function () {
  $http.get(apiUrl + "/users/" + auth.profile.identities[0].user_id + "/profiledata")
    .success(function (courses) {
      $scope.chart = {
          labels : courses.distance,
          datasets : [
              {
                  fillColor : "rgba(151,187,205,0)",
                  strokeColor : "#e67e22",
                  pointColor : "rgba(151,187,205,0)",
                  pointStrokeColor : "#e67e22",
                  data : courses.distance
              },
          ] 
      };
    })
}

});
