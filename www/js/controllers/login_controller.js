starter.controller('LoginCtrl', function (store, $scope, $location, auth) {
  $scope.login = function() {
    auth.signin({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, function(profile, token, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', token);
      store.set('refreshToken', refreshToken);
      $location.path('/app/profile');
    }, function(error) {
    });
  }

  $scope.logout = function() {
    auth.signout();
    console.log('signout');
    store.remove('profile');
    store.remove('token');
    // store.remove('refreshToken');
    // $location.path('/app/profile');
    $location.path('/app/courses/new');
  }
})




