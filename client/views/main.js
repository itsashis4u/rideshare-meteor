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
		setTimeout(function(){
			var p1 = new google.maps.LatLng(Session.get('depart_lat'), Session.get('depart_lng'));
		var p2 = new google.maps.LatLng(Session.get('arrive_lat'), Session.get('arrive_lng'));
  		var distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  		Session.set('distance', distance);
		}, 500)
	},
	'blur #departure' : function(){
		if(document.getElementById('arrival').value != ""){
			setTimeout(function(){
			var p1 = new google.maps.LatLng(Session.get('depart_lat'), Session.get('depart_lng'));
		var p2 = new google.maps.LatLng(Session.get('arrive_lat'), Session.get('arrive_lng'));
  		var distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  		Session.set('distance', distance);
		}, 500)
		}
	},
	'click .price_label' : function(){
		$('#price').val(Session.get('travel_cost'));
	}
});