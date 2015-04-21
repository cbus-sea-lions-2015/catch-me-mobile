// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter.controllers', []);
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'timer', 'auth0',
  'angular-storage',
  'angular-jwt'
])


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

.run(function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
})

.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          // Either show Login page or use the refresh token to get a new idToken
          $location.path('/');
        }
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
  $stateProvider

  // This is the state where you'll show the login
    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
  })
 
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl',
    data: {
      requiresLogin: true
    }
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
        templateUrl: "templates/users/profile.html"
      }
    }
  })

  .state('app.index', {
    url: "/index",
    views: {
      'menuContent': {
        templateUrl: "templates/index.html"
      }
    },
    data: {
    requiresLogin: false
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
  $urlRouterProvider.otherwise('/app/index');


  authProvider.init({
    domain: 'catch-me.auth0.com',
    clientID: 'U3JIG5lzDT24LftYdy8aS14BjTd9Koaf',
    loginState: 'login'
  })

  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    // If no token return null
    if (!idToken || !refreshToken) {
      return null;
    }
    // If token is expired, get a new one
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');

});
