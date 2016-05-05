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