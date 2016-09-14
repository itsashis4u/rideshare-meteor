import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.navbar.helpers({
	showLogin: function () {
		if(Session.get('isOnboarding'))
			return false;
		else
			return true;
	}
});

Template.navbar.events({
	'click .logout': function (t, e) {
		AccountsTemplates.logout();
	}
});

Template.home.events({
	'click .offer-ride-btn': function () {
		FlowRouter.go('offer-ride');
	}
});

if(Meteor.isClient){	
	Tracker.autorun(function() {
	  var routeName = FlowRouter.getRouteName();
	  console.log("Current route name is: ", routeName);
	  if(routeName != undefined && (routeName == 'atSignIn' || routeName == 'atSignUp')) {
	  	Session.set('isOnboarding', true);
	  }
	  else{
	  	Session.set('isOnboarding', false);
	  }
	});
}

Template.searchRide.onRendered(function () {
// GoogleMaps.load();
  var source = document.getElementById('source_place');
  var destination = document.getElementById('destination_place');
  autocomplete_source = new google.maps.places.Autocomplete(source);
  autocomplete_destination = new google.maps.places.Autocomplete(destination);
  google.maps.event.addListener(autocomplete_source, 'place_changed', function() {
  	console.log(autocomplete_source.getPlace())
  });

  google.maps.event.addListener(autocomplete_destination, 'place_changed', function() {
  	console.log(autocomplete_destination.getPlace());
  });
  
});


// Template.searchRide.events({
// 	'click #search-ride-btn': function () {

// 	}
// });

Template.offerRide.onRendered( function(){
	var o_source = document.getElementById('departure');
  	var o_destination = document.getElementById('arrival');

  	var depart = new google.maps.places.Autocomplete(o_source);
  	var arrive = new google.maps.places.Autocomplete(o_destination);

  google.maps.event.addListener(depart, 'place_changed', function() {
  	Session.set('depart_lat', depart.getPlace().geometry.location.lat());
  	Session.set('depart_lng', depart.getPlace().geometry.location.lng());
  });

  google.maps.event.addListener(arrive, 'place_changed', function() {
  	Session.set('arrive_lat', arrive.getPlace().geometry.location.lat());
  	Session.set('arrive_lng', arrive.getPlace().geometry.location.lng());
  });

});

Template.offerRide.helpers({
	travel_price: function () {
		var d = Session.get('distance');
		var cost = Math.round(parseInt(d*3)/10) *10;
		console.log(cost);
		$('.price_label').removeClass('hidden');
		Session.set('travel_cost', cost);
		return cost;
		
	}
});

Template.offerRide.events({
	'blur #seats': function (e, t) {
		var sel = e.target;
		sel.value = parseInt(sel.value);
		if(sel.value > 6){
			sel.value = 6;
		}
		else if(sel.value < 1){
			sel.value = 1;
		}
		console.log(Session.get('arrive_lat'));
	},
	'blur #price': function (e, t) {
		var sel = e.target;
		sel.value = parseInt(sel.value);
		if(sel.value > 5000){
			sel.value = 5000;
		}
		else if(sel.value < 0){
			sel.value = 0;
		}
		
	},
	'blur #arrival' : function(){
		getDistance();
		plotDistance();
	},
	'blur #departure' : function(){
		if(document.getElementById('arrival').value != ""){
			getDistance();
			plotDistance();
		}
	},
	'click .price_label' : function(){
		$('#price').val(Session.get('travel_cost'));
	},
	'submit form' : function(e, t){
		e.preventDefault();
		var ride = {};
		ride.owner = Meteor.user().profile.fullname;
		ride.ownerId = Meteor.userId();
		ride.ownerVehicle = Meteor.user().profile.vehiclename;
		ride.ownerMobile = Meteor.user().profile.phonenumber;
		ride.from = t.$('#departure').val();
		ride.to = t.$('#arrival').val();
		ride.from_coords = {}, ride.to_coords = {};
		ride.from_coords.lat = Session.get('depart_lat');
		ride.from_coords.lng = Session.get('depart_lng');
		ride.to_coords.lat = Session.get('arrive_lat');
		ride.to_coords.lng = Session.get('arrive_lng');
		ride.time = t.$('#date').val();
		ride.seats = t.$('#seats').val();
		ride.distance = Session.get('distance');
		ride.price = t.$('#price').val();
		ride.polyline = Session.get('polyline');
		ride.createdAt = new Date();
		console.log(Rides.insert(ride));
		FlowRouter.go('list');
	}
});

function getDistance(){
	setTimeout(function(){
			var p1 = new google.maps.LatLng(Session.get('depart_lat'), Session.get('depart_lng'));
		var p2 = new google.maps.LatLng(Session.get('arrive_lat'), Session.get('arrive_lng'));
  		var distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  		Session.set('distance', distance);
		}, 500)
}

function plotDistance(){
	setTimeout(function(){
		var waypt = [];
		var map = new google.maps.Map(document.getElementById('map-container'), {
          zoom: 8,
          center: {lat: 20.2961, lng: 85.8245}
        });
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
	var o = document.getElementById('departure').value;
	var d = document.getElementById('arrival').value;
	console.log(o, d)
	directionsService.route({
          origin: o,
          destination: d,
          waypoints: waypt,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            console.log(route.overview_polyline);
            Session.set('polyline', route.overview_polyline); 
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
	}, 500)
}