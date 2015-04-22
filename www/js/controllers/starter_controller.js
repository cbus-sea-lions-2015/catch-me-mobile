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
   

    $ionicModal.fromTemplateUrl('templates/courses/favorites.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal_favorites) {
    $scope.show_favorites = modal_favorites;
  });

  $scope.openFavorites = function() {
    $scope.show_favorites.show();
  };

  $scope.closeFavorites = function() {
    $scope.show_favorites.hide();
  };
   


  $scope.startRun = function() {
    $scope.name_course.hide();
    var auth_id = auth.profile.identities[0].user_id;
     

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

          console.log(  $window.localStorage.course_id);
        }
      });
    $location.url("/app/courses/new");

    

  };

  if (auth.isAuthenticated) {
    var auth_id = auth.profile.identities[0].user_id;
    
    $http.get(apiUrl + "/users/" + auth_id + "/courses")
      .success(function(response) {
        $scope.courses = response;
        $scope.favorite_courses = response.filter(function(course) { return course.favorite == true; });
      });
       
  
  }  

  $scope.myRuns = function() {
    $location.url("/app/courses");
    document.location.reload(true);
  }


});
