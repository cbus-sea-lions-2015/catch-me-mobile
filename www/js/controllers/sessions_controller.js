starter.controller('SessionsCtrl', function($scope, $ionicModal, $timeout, $http) {

  $scope.loginData = {};
  //user runner id so store current user.
  $scope.runner_id = {};

  $ionicModal.fromTemplateUrl('templates/sessions/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http.post('http://catch-me-api.herokuapp.com/users/authenticate', $scope.loginData).
    success(function(response){
      if (response === false) {
        alert("Username or password did not match");
      } else {
        $scope.closeLogin();
      }
    });

    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 250);
  };
})



