FlowRouter.route('/', {
    name: 'home',
    action: function(params, queryParams) {
        BlazeLayout.render('masterLayout', {
            main: 'home',
            navbar: 'navbar',
            footer : 'footer'
        });
    }
});

FlowRouter.route('/offer-ride', {
    name: 'offer-ride',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function(params, queryParams) {
        BlazeLayout.render('masterLayout', {
            main: 'offerRide',
            navbar: 'navbar',
            footer : 'footer'
        });
    }
});

FlowRouter.route('/list', {
    name: 'list',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function(params, queryParams) {
        BlazeLayout.render('masterLayout', {
            main: 'list',
            navbar: 'navbar',
            footer : 'footer'
        });
    }
});

FlowRouter.route('/search-list', {
    name: 'search-list',
    action: function(params, queryParams) {
        var origin = queryParams.from.split(',');
        var dest = queryParams.to.split(',');
        Session.set('ro_lat', origin[0]);
        Session.set('ro_lng', origin[1]);
        Session.set('rd_lat', dest[0]);
        Session.set('rd_lng', dest[1]);
        BlazeLayout.render('masterLayout', {
            main: 'searchList',
            navbar: 'navbar',
            footer : 'footer'
        });
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