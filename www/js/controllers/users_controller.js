starter.controller('UsersCtrl', function($scope, apiUrl, auth, $http) {
 //  $scope.dataForCharts;
   


$scope.getChartData = function () {
      console.log('asdadasdasds');
  $http.get(apiUrl + "/users/" + auth.profile.identities[0].user_id + "/courses'")
    .success(function (courses) {
      $scope.chartData = courses;
      console.log(courses);
      console.log('asdadasdasds');
    })
}
 

$scope.chart = {
          labels : [4, 3, 5, 4, 6,8, 3, 2, 5, 4,10, 3, 2, 5, 4,8, 3, 2, 5, 4],
          datasets : [
              {
                  fillColor : "rgba(151,187,205,0)",
                  strokeColor : "#e67e22",
                  pointColor : "rgba(151,187,205,0)",
                  pointStrokeColor : "#e67e22",
                  data : [4, 3, 5, 4, 6,8, 3, 2, 5, 4,10, 3, 2, 5, 4,8, 3, 2, 5, 4]
              },
          ] 
      };

});
