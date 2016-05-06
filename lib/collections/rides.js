Rides = new Mongo.Collection('rides');

Success = new Mongo.Collection('success');

if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllPosts: function() {
        return Success.remove({});
      }
    });
  });
}