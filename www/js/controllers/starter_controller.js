starter.controller('StarterCtrl', function(auth, $ionicModal, $scope, $http, $location, $window, apiUrl) {

  $scope.courseData = {};

  $ionicModal.fromTemplateUrl('templates/courses/name_course.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.name_course = modal;
  });

  $scope.openNameCourse = function() {
    $scope.name_course.show();
  };

  $scope.closeNameCourse = function() {
    $scope.name_course.hide();
  };



  $scope.startRun = function() {
    $scope.name_course.hide();
    // var auth_id = auth.profile.identities[0].user_id;
    var auth_id = "1481964522";
     

    // $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true')
    // .success(function (location){
    //   console.log(location);
    // })

    $http.post(apiUrl + "/courses", {
        auth_id: auth_id,
        name: $scope.courseData.name
      })
      .success(function(response) {
        console.log(response);
        if (response != false) {
          $window.localStorage.course_id = response;

        }
      });
    $location.url("/app/courses/new");

    

  };

  if (auth.isAuthenticated) {
    var auth_id = auth.profile.identities[0].user_id;
    
    $http.get(apiUrl + "/users/" + auth_id + "/courses")
      .success(function(response) {
        $scope.courses = response;
      });
  }


  $scope.myRuns = function() {
    $location.url("/app/courses");
    // document.location.reload(true);
  }


});
