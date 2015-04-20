// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var starter =  angular.module('starter.controllers', []);
angular.module('starter', ['ionic','starter.controllers','timer'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/users/profile.html"
      }
    }
  })
    .state('app.courses', {
      url: "/courses",
      views: {
        'menuContent': {
          templateUrl: "templates/courses/run.html",
          controller: 'StarterCtrl'
        }
      }
    })

      .state('app.runs', {
      url: "/runs",
      views: {
        'menuContent': {
          templateUrl: "templates/courses/new-run.html",
          controller: 'CoursesCtrl'
        }
      }
    })

       .state('app.show', {
      url: "/show",
      views: {
        'menuContent': {
          templateUrl: "templates/courses/show.html",
          controller: 'MapCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
