Template.list.helpers({
	rides: function () {
		return Rides.find({ownerId : Meteor.userId()}, {sort : {time : 1}});
	},
	ridesCount : function() {
		return (Rides.find({ownerId : Meteor.userId()}).count() != 0);
	}
});