
var FADE_TIME = 150; // ms
var TYPING_TIMER_LENGTH = 400; // ms

// Initialize varibles
var $window = $(window);
var $usernameInput = $('.usernameInput'); // Input for username
var $messages = $('.messages'); // Messages area
var $inputMessage = $('.inputMessage'); // Input message input box

var $loginPage = $('.login.page'); // The login page
var $chatPage = $('.chat.page'); // The chatroom page

// Prompt for setting a username
var username;
var connected = false;
var typing = false;
var lastTypingTime;
var $currentInput = $usernameInput.focus();

/* Socket.io */
var socket = io();




// Sets the client's username
function setUsername () {
	username = $usernameInput.val().trim();

	// If the username is valid
	if (username) {
	  $loginPage.fadeOut();
	  $chatPage.show();
	  $loginPage.off('click');

	  // Tell the server your username
	  socket.emit('add user', username);
	 }
}

/* Google Maps */
var map;
var placeMarker = {};
var placeMarker2 = {};
var userPosition = {};
var image = {};

function initMap() {

	var defaultLatLng = new google.maps.LatLng(32.07, 34.77);



	var mapOptions = {
	    center: defaultLatLng,
	    zoom: 3, 
	    minZoom: 0, 
	    maxZoom: 18, 
	    zoomControl:true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
	    mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map
	    scrollwheel: true, // Enable Mouse Scroll zooming
	    panControl:false, // Set to false to disable
	    mapTypeControl:false, // Disable Map/Satellite switch
	    scaleControl:false, // Set to false to hide scale
	    streetViewControl:false, // Set to disable to hide street view
	    overviewMapControl:false, // Set to false to remove overview control
	    rotateControl:false // Set to false to disable rotate control
	};

	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, mapOptions);

	image = {
		url: 'images/place_marker.png',
		scaledSize: new google.maps.Size(30, 30)
	};


	placeMarker = new google.maps.Marker({
	    icon: image,
	    labelAnchor: new google.maps.Point(22, 0),
	    map: map
	});

	placeMarker2 = new google.maps.Marker({
		icon: image,
		labelAnchor: new google.maps.Point(22, 0),
		map: map
	})

	if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	  userPosition = {
	    lat: position.coords.latitude,
	    lng: position.coords.longitude
	  };
	  socket.emit('location', userPosition);
	  placeMarker.setPosition(userPosition);
	  map.panTo(userPosition);
	  });
	}
	else {
		infoWindow.open(map);
		infoWindow.setContent("Error: The Geolocation Service failed");
	 } 
}


  // Keyboard events

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      setUsername();
    }
  });

/* Create a popup infoWindow when user enters text */
	var userMsg;
	socket.on('chat message', function(who, msg){ 
	 var user = who;
	 var infoWindow = new google.maps.InfoWindow({});
	 infoWindow.setContent(who + ":" + " " + msg);
	 infoWindow.open(map, placeMarker);
	 infoWindow.setPosition(userPosition);
	  setTimeout(function () { infoWindow.close(); }, 5000);
	});


function refresh_marker(position) {
	placeMarker2.setPosition(position);
}

/* When user submits message */
$('form').submit(function(){
	socket.emit('chat message', $('#m').val());
	socket.emit('msglocation', userPosition);
$('#m').val('');
return false;
});

socket.on('location', function(position){
	refresh_marker(position);
})
