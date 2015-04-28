starter.controller('StarterCtrl', function(auth, $ionicModal, $scope, $http, $location, $window, apiUrl, $state) {

  $scope.courseData = {};
  $scope.favoriteCourse = {};

  $ionicModal.fromTemplateUrl('templates/courses/name_course.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.name_course = modal;
  });

  $scope.courseChange = function (response) {
    console.log($scope.favoriteCourse.course);
  }
 

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
    
    $scope.favoriteCourseId = function () {
      if ($scope.favoriteCourse.course == null) {
       return null
      }
      else {
       return $scope.favoriteCourse.course.id
      }
    }

    $http.post(apiUrl + "/courses", {
        auth_id: auth_id,
        name: $scope.courseData.name,
        catch_me_course_id: $scope.favoriteCourseId()
      })
      .success(function(response) {
        if (response != false) {
          $window.localStorage.course_id = response;
        }
      });

    // $location.url("/app/courses/new");
    $state.go('app.runs', {}, {cache: true});
    
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
    // $location.url("/app/courses");
    $state.go('app.courses', {}, {cache: true});
  }

});
