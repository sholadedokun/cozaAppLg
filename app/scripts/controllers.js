angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('AddStockCtrl', function($scope, $stateParams) {
  $scope.sType=[
    {'name':'Audio CD', 'value':'Audio CD'},
    {'name':'Video DVD', 'value':'Video DVD'},
    {'name':'Books', 'value':'Books'},
    {'name':'Utilities', 'value':'Utilities'}
  ]
  $scope.tagTypes=[
    {'name':'mp3', 'value':'mp3'},
    {'name':'WMA', 'value':'WMA'},
    {'name':'Bible', 'value':'Bible'},
    {'name':'Stickers', 'value':'Stickers'},
    {'name':'Prayer', 'value':'Prayer'},
    {'name':'Faith', 'value':'Faith'},
    {'name':'Finance', 'value':'Finance'},
    {'name':'Motivational', 'value':'Motivational'}
    {'name':'7DG', 'value':'7DG'},
    {'name':'12DG', 'value':'12DG'},
    {'name':'Fasting', 'value':'Fasting'},
    {'name':'Marriage', 'value':'Marriage'}
  ]
  $scope.stock={'type':'Audio CD', 'tag':'WMA'}
});
