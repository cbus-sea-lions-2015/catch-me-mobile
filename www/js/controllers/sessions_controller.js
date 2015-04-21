starter.controller('SessionsCtrl', function($window, $scope, $location, $ionicModal, $timeout, $http) {

  $scope.loginData = {};
  $scope.runner_id = {};

  $ionicModal.fromTemplateUrl('templates/sessions/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.doLogout = function() {
    $window.userId = null;
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    $http.post('http://catch-me-api.herokuapp.com/users/authenticate', $scope.loginData).
    success(function(response){
      if (response === false) {
        alert("Username or password did not match");
      } else {

        $scope.closeLogin();
        $location.url("/app/courses");
        $window.localStorage.userId = response;
        console.log($window.localStorage.userId);
      }
    });

  };
})



