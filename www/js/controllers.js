angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};
  $scope.runner_id = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.register.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/new-run.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.startRun.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.register = function() {
    $scope.register.modal.show();
  };

  $scope.closeRegister = function() {
    $scope.register.modal.hide();
  };

   $scope.startRun = function() {
     $scope.startRun.modal.show();
  };

    $scope.closeRun = function() {
      if (confirm("are you sure") == true ){
          $scope.startRun.modal.hide();
      }
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
        console.log(response);
      }
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 250);
  };

  $scope.doRegister = function() {
    console.log("Doing Register", {register_data: $scope.registerData});

    $http.post('http://catch-me-api.herokuapp.com/users', {register_data: $scope.registerData}).
    success(function(response){
      if (response === false){
        alert("that shit is invalid or taken");
      } else {
        $scope.closeRegister();
      }
    });
  };
})



.controller('CoursesCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
