
//namespace in de global scope
var APP = APP || {};

// anonieme functie
(function () {

  // contoller object
  APP.controller = {

      init: function () { 
          
          // Wait for Cordova to connect with the device
          $$(document).on('deviceready', APP.controller.startObjects);
          
          // methode van functie
          APP.interaction.init();
      },
      // cordova is geladen
      startObjects: function() {
          APP.camera.onDeviceReady();
      }

  };
  // camera object
  APP.camera = {

    onDeviceReady: function(){
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    },
    
    onPhotoDataSuccess: function(imageData){
        // Uncomment to view the base64 encoded image data
        // console.log(imageData);
        
        // Get image handle
        var smallImage = document.getElementById('smallImage');
        
        // Unhide image elements
        smallImage.style.display = 'block';
        
        // Show the captured photo
        // The inline CSS rules are used to resize the image
        smallImage.src = "data:image/jpeg;base64," + imageData;
        
        //object AAP.motion wordt uitgevoerd, mobiel trilt
        APP.motion.vibrate();
    },
    
    onPhotoURISuccess: function(imageURI){
        // Uncomment to view the image file URI 
        // console.log(imageURI);

        // Get image handle
        var largeImage = document.getElementById('largeImage');

        // Unhide image elements
        largeImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        largeImage.src = imageURI;
    },
    
    capturePhoto: function(){
    	// Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(APP.camera.onPhotoDataSuccess, APP.camera.onFail, { quality: 50,
            destinationType: destinationType.DATA_URL });
    },
    capturePhotoEdit: function(){
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
    	navigator.camera.getPicture(APP.camera.onPhotoDataSuccess, APP.camera.onFail, { quality: 20, allowEdit: true,
            destinationType: destinationType.DATA_URL });
    },
    getPhoto: function(source){
      // Retrieve image file location from specified source
      navigator.camera.getPicture(APP.camera.onPhotoURISuccess, APP.camera.onFail, { quality: 50, 
            destinationType: destinationType.FILE_URI,
            sourceType: source });
    },
    onFail: function(message){
      alert('Failed because: ' + message);
    }

  }

  APP.motion = {
  	
      vibrate: function() {
          
          navigator.notification.vibrate(2000);
      }
  }

  APP.interaction = {
      
      init: function() {
          // methodes van de functies worden hier verzameld
          APP.interaction.create_photo_btn();
          APP.interaction.create_editable_photo_btn();
          APP.interaction.get_photolibrary_btn();
      },
      create_photo_btn: function() {
          
          var btn = document.getElementById('create_photo_btn');
          
          btn.onclick = function () {
          
              APP.camera.capturePhoto();   
          };
      },
      create_editable_photo_btn: function() {
          
          var btn = document.getElementById('create_editable_photo_btn');
          
          btn.onclick = function () {
          
              APP.camera.capturePhotoEdit();  
          };
      },
      get_photolibrary_btn: function() {
          
          var btn = document.getElementById('get_photolibrary_btn');
          
          btn.onclick = function () {
          
              APP.camera.getPhoto();  
          };
      
  }
// Domready-functie
// Deze functie wordt uitgevoerd zodra de DOM is geladen
domready(function () {
  // De applicatie kan worden gestart
  APP.controller.init();
});

})();