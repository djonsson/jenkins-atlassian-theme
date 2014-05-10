jQuery(function($){
	var welcomeMessage 	= 'Welcome to Jenkins - CI Server';
	var srcDirectory 	= 'http://develop.source.test.do/src/';

	var mainPanel 		= $( '#main-panel' );
	var sidePanel 		= $( '#side-panel' );

	var usernameLabel 	= $('input[name="j_username"]').closest('td').prev('td').addClass('input-label');
	var passwordLabel 	= $('input[name="j_password"]').closest('td').prev('td').addClass('input-label');
	var signupContainer	= $('a[href=signup]').closest('div').addClass('signup-container');
	var loginButton		= $('#yui-gen1-button').addClass('login-button');
	var buttonSpan		= $('.submit-button');

	var loginContainer  = $( '#main-panel div:first' ).addClass( 'login-container' );

	var loginForm 		= $( 'form[name="login"]' ).length;

	if (loginForm) {
		appendStyleSheet( srcDirectory + 'login.css' );
			
		sidePanel.hide();
		mainPanel.css( 'background', '#f5f5f5' );

		usernameLabel.text( 'Username' );
		passwordLabel.text( 'Password' );

		loginContainer.removeAttr( 'style' );

		loginContainer.wrap ( createDiv( 'login-outer'    ) );
		loginContainer.wrap ( createDiv( 'login-wrapper'  ).prepend(' <h2> ' + welcomeMessage + ' </h2> '));
		buttonSpan.wrap 	( createDiv( 'button-wrapper' ) );

		$( '.login-container div:last' ).removeAttr( 'style' );
	}

	function createDiv ( name ) {
		return $('<div />', {
		"class": name,
		});
	}

	function appendStyleSheet( stylesheet ) {
		return $( '<link>' ).attr( 'rel'  , 'stylesheet')
			.attr( 'type' , 'text/css' )
			.attr( 'href' , stylesheet )
			.appendTo( 'head' );
	}
});
