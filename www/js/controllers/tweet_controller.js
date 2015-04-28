starter.controller('TweetCtrl', function($scope, $cordovaSocialSharing) {
  // $scope.auth = auth;

  $scope.shareAnywhere = function(speed) {
     
         $cordovaSocialSharing.shareViaTwitter("Checkout my new Catch me stats - speed=" + speed, "", "")
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
        });
    
  }




});
