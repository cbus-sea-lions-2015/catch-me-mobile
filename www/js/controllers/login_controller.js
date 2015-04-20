// starter.controller('LoginCtrl', function (store, $scope, $location, auth) {
//   $scope.login = function() {
//     // console.log('login');

//     var something = auth.signin({
//       authParams: {
//         scope: 'openid offline_access',
//         device: 'Mobile device'
//       }
//     }
//   //   , function(profile, token, accessToken, state, refreshToken) {
//   //     // Success callback
//   //     console.log('success');
//   //     store.set('profile', profile);
//   //     store.set('token', token);
//   //     store.set('refreshToken', refreshToken);
//   //     $location.path('/app/profile'); ///app/profile
//   //     // $state.go('app.profile');
//   //   }, function() {
//   //     // Error callback
//   //     console.log('failure');
//   //   });
//   // }
//   console.log(something);
//   $scope.logout = function() {
//     auth.signout();
//     store.remove('profile');
//     store.remove('token');
//   }

// })

starter.controller('LoginCtrl', function (store, $scope, $location, auth) {
  $scope.login = function() {
    auth.signin({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, function(profile, token, accessToken, state, refreshToken) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      store.set('refreshToken', refreshToken);
      $location.path('/app/profile');
    }, function(error) {
      // Error callback
      console.log('Error');
      console.log(error);
    });
  }

  $scope.logout = function() {
    auth.signout();
    console.log('signout');
    store.remove('profile');
    store.remove('token');
  }
})




