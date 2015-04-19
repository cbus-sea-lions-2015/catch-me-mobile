starter.controller('UsersCtrl', function($scope, $ionicModal, $timeout, $http) {
  // Form data for the login modal
  $scope.registerData = {};
  // Create the login modal that we will use later

  $ionicModal.fromTemplateUrl('templates/users/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.register.modal = modal;
  });

  $scope.register = function() {
    $scope.register.modal.show();
  };

  $scope.closeRegister = function() {
    $scope.register.modal.hide();
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






