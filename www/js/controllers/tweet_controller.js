starter.controller('TweetCtrl', function($scope, $cordovaSocialSharing) {
  // $scope.auth = auth;

  $scope.shareAnywhere = function() {
    console.log("we in here")
     
         $cordovaSocialSharing.shareViaTwitter("message", "image", "link")
        .then(function(result) {
          // Success!
          console.log("we in here too")
        }, function(err) {
          // An error occurred. Show a message to the user
          console.log("we in here too")
        });
    
  }




});
