starter.controller('TweetCtrl', function($scope, $cordovaSocialSharing) {
  // $scope.auth = auth;

  $scope.shareAnywhere = function() {
    $cordovaSocialSharing.share("This is the body of the shit", "this is the title", null, "https://www.google.com");
  }


});
