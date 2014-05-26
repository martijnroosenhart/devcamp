
//namespace in de global scope
var APP = APP || {};

// self invoking function
(function () {

  // contoller object
  APP.controller = {

      init: function () { 
          
          // Wait for Cordova to connect with the device
          $$(document).on('deviceready', APP.camera.init);
          
          // methode van functie
          APP.interaction.init();
      },

  };
  // camera object
  APP.camera = {
    // initialezeren van camera 
    init: function(){
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    },
    
    success: function(imageData){
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
    
    URISuccess: function(imageURI){
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
      navigator.camera.getPicture(APP.camera.success, APP.camera.onFail, { quality: 50,
            destinationType: destinationType.DATA_URL });
    },
    capturePhotoEdit: function(){
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
    	navigator.camera.getPicture(APP.camera.success, APP.camera.onFail, { quality: 20, allowEdit: true,
            destinationType: destinationType.DATA_URL });
    },
     
    getPhoto: function(source) {
       // Retrieve image file location from specified source
          navigator.camera.getPicture(APP.camera.URISuccess, APP.camera.onFail, { quality: 50, 
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
          APP.interaction.btn_take_photo();
          APP.interaction.btn_editable_photo();
          APP.interaction.btn_photolibrary();
          APP.interaction.largeImage();
          APP.interaction.smallImage();
      },
      btn_take_photo: function() {
          
          var btn = document.getElementById('btn_take_photo');
          
          btn.onclick = function () {
          
              APP.camera.capturePhoto();   
          };
      },
      btn_editable_photo: function() {
          
          var btn = document.getElementById('btn_editable_photo');
          
          btn.onclick = function () {
          
              APP.camera.capturePhotoEdit();  
          };
      },
      btn_photolibrary: function() {
          
          var btn = document.getElementById('btn_photolibrary');
          
          btn.onclick = function () {
          
              APP.camera.getPhoto();  
          };
      },

      smallImage: function() {
        var btn = document.getElementById('smallImage');

        btn.onclick = function(){

              APP.motion.vibrate();
        };
      },
      largeImage: function() {
        var btn = document.getElementById('largeImage');

        btn.onclick = function(){

              APP.motion.vibrate();
        };
      }

}
// Domready-functie
// Deze functie wordt uitgevoerd zodra de DOM is geladen
domready(function () {
  // De applicatie kan worden gestart
  APP.controller.init();
});

})();