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


.controller('AddStockCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', '$cordovaCamera',  '$ionicLoading',  function($scope, $stateParams, $http, $ionicPopup, $cordovaCamera,  $ionicLoading) {
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
    {'name':'Motivational', 'value':'Motivational'},
    {'name':'7DG', 'value':'7DG'},
    {'name':'12DG', 'value':'12DG'},
    {'name':'Fasting', 'value':'Fasting'},
    {'name':'Marriage', 'value':'Marriage'}
  ]
  $scope.stock={'type':'Audio CD', 'tag':'WMA', 'tags':''};
  $scope.data = { "ImageURI" :  "Select Image" };
  $scope.picData ;
    $scope.getLocation=function(){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    var onSuccess = function(position) {
        // alert('Latitude: '          + position.coords.latitude          + '\n' +
        //       'Longitude: '         + position.coords.longitude         + '\n' +
        //       'Altitude: '          + position.coords.altitude          + '\n' +
        //       'Accuracy: '          + position.coords.accuracy          + '\n' +
        //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //       'Heading: '           + position.coords.heading           + '\n' +
        //       'Speed: '             + position.coords.speed             + '\n' +
        //       'Timestamp: '         + position.timestamp                + '\n');
              $scope.laglong=position.coords.latitude+','+position.coords.longitude;
              $http({method:'GET', url:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.laglong+'&sensor=true'}).
                  then(function successCallback(response) {
                      alert(response.data.results)
                      console.log(response);
                      var alertPopup = $ionicPopup.alert({
                      title: 'possible Addresses!',
                      template: response.data,
                  })
              },
                  function errorCallback(err) {
                    var alertPopup = $ionicPopup.alert({
                    title: 'Cannot get your current Location!',
                    template: 'Sorry we couldn\'t get your current Location; Please try again later!',
                  });
            })
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    $scope.takePicture = function() {
	  var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA
      };
      $cordovaCamera.getPicture(options).then(
          function(imageData) {
			$scope.picData = imageData;
			$scope.ftLoad = true;
		//	$localstorage.set('fotoUp', imageData);
			$ionicLoading.show({template: 'Fetching Image...', duration:500});
		},
		function(err){
			$ionicLoading.show({template: 'Error Fetching Image...', duration:500});
			})
	  }
	  $scope.selectPicture = function() {
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
		};
	  $cordovaCamera.getPicture(options).then(
		function(imageURI) {
			window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
				$scope.picData = fileEntry.nativeURL;
				$scope.ftLoad = true;
				var image = document.getElementById('myImage');
				image.src = fileEntry.nativeURL;
  			});
			$ionicLoading.show({template: 'Fetching Image...', duration:500});
		},
		function(err){
			$ionicLoading.show({template: 'Error Fetching Image...', duration:500});
		})
	};

    $scope.uploadPicture = function() {
        console.log("here to upload");
		$ionicLoading.show({template: 'Saving Pictures...'});
		var fileURL = $scope.picData;
        console.log(fileURL);
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
        options.headers = {   Connection: "close"};
		var params = {};
		params.value1 = "post_img";
        params.value2 = "pict";

		options.params = params;

		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI("http://192.168.1.6/Projects/cozaAppLg/www/server/upload.php"), viewUploadedPictures, function(error) {console.log('here getting erorrs '+ JSON.stringify(error)); $ionicLoading.show({template: 'Error Uploading Image...'+error});
		$ionicLoading.hide();}, options);
    }

	var viewUploadedPictures = function() {
		/*$ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.yourdomain.com/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
					return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()}	;
		$ionicLoading.hide();*/
        console.log('good')
    }

	$scope.viewPictures = function() {
		$ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.yourdomain.com/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
					return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()}	;
		$ionicLoading.hide();
    }


  $scope.tagCollector=function(){ //doesn't auto correct when you try to add a tag twice.
    console.log($scope.stock.tags)
    if($scope.stock.tags==null || $scope.stock.tags==''){
      $scope.stock.tags=$scope.stock.tag;
    }
    else{$scope.stock.tags=$scope.stock.tags+' | '+$scope.stock.tag;}
  }


   //submit the whole code
  $scope.submitStock=function(){
    console.log($scope.stock);
    $http.jsonp('http://127.0.0.1/projects/cozaAppLg/www/server/addStock.php?callback=JSON_CALLBACK',{ params:$scope.stock}).
        success(function(responseData, status, headers, config) {
            var alertPopup = $ionicPopup.alert({
            title: 'Stock Added!',
            template: 'Continue!',
        })
    },
        function(err) {
          var alertPopup = $ionicPopup.alert({
          title: 'Registration failed!',
          template: 'Please try again!',
        });
  })
  }
}]);
