starter.controller('LoginCtrl', function (store, $scope, $location, auth, $state) {
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
      // $location.path('/app/profile');
      console.log('logging in');
    }, function(error) {
    });
  }

  $scope.logout = function() {
    auth.signout();
    console.log('signout');
    store.remove('profile');
    store.remove('token');
    // $location.path('/login');
    document.location.reload(true);

  }

})




