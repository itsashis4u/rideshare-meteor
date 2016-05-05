Template.mapbox.onRendered(function (){
	delete Session.keys['distance'];
	var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map-container'), {
          zoom: 8,
          center: {lat: 20.2961, lng: 85.8245}
        });
        directionsDisplay.setMap(map);
});

Template.mapbox.helpers({
	distance: function () {
		var d = Session.get('distance');
		if(d != undefined)
			return d + " KM";
	return false;
	}
});