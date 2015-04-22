starter.controller('LoginCtrl', function (store, $scope, $location, $http, auth, $state, apiUrl) {
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
      console.log(auth.profile.identities[0].user_id)
      $http.post(apiUrl+"/users", {auth_id: auth.profile.identities[0].user_id});
      console.log('logging in');
    }, function(error) {
    });
  }
   

  $scope.logout = function() {
    auth.signout();
    console.log('signout');
    store.remove('profile');
    store.remove('token');
    $location.url("/app/login")
    document.location.reload(true);
  }

  $scope.tokenIsSet = function() {
    return auth.profile == null
  }

})




