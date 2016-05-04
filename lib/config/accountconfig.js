AccountsTemplates.configure({
    defaultLayout: 'masterLayout',
    defaultLayoutRegions: {
    	navbar : 'navbar',
    	footer : 'footer'
    },
    defaultContentRegion: 'main'
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');

var email = AccountsTemplates.removeField('email');
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.addField({
    _id: 'fullname',
    displayName: 'Full Name',
    type: 'text',
    placeholder: {
        signUp: 'Full Name'
    },
    required: true,
    errStr: 'Field should not be empty'
});

AccountsTemplates.addField(email);
AccountsTemplates.addField({
    _id: 'phonename',
    displayName: 'Mobile Number',
    type: 'text',
    placeholder: {
        signUp: 'Mobile Number'
    },
    required: true,
    errStr: 'Field should not be empty'
});

AccountsTemplates.addField({
    _id: 'vehiclename',
    displayName: 'Vehicle Name',
    type: 'text',
    placeholder: {
        signUp: 'Vehicle Name (Optional)'
    },
    required: false
});

AccountsTemplates.addField(pwd);

var logoutMethod = function (error, state){	
	console.log("Home")
	FlowRouter.go('home');
}

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    // onLogoutHook: logoutMethod,
    // onSubmitHook: mySubmitFunc,
    // preSignUpHook: myPreSubmitFunc,
    // postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});
